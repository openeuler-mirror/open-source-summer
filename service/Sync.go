package service

import (
	"fmt"

	"github.com/opensourceways/go-gitee/gitee"
	"github.com/xanzy/go-gitlab"

	"openSummer/Client"
	"openSummer/Dao"
	"openSummer/Model"
)

var UserMap map[string]Model.User
var giteeCli *Client.GiteeClient
var gitlabCli *Client.GitlabClient
var SyncTask *Model.TaskConfig

func Sync() {
	giteeCli = Client.Gitee
	gitlabCli = Client.Gitlab

	for _, task := range SyncTask.SyncTasks[0].Task {
		SyncType := task.Type
		SourceOrg := task.Source[0].Org
		if SyncType == "organization" {
			fmt.Println("开始获取仓库信息")
			repos, err := giteeCli.GetRepos(SourceOrg)
			fmt.Printf("仓库信息获取完成，共有%d个仓库\n", len(repos))

			if err != nil {
				_ = fmt.Errorf(err.Error())
			}
			subRepo := repos[0:3]

			SyncCode(subRepo, task.Target[0].Org, SourceOrg)
			SyncIssue(subRepo, task.Target[0].Org, SourceOrg)
			SyncPr(subRepo, task.Target[0].Org, SourceOrg)
		}

	}

}

func SyncCode(repos []gitee.Project, targetOrg, sourceOrg string) {
	fmt.Println("开始同步代码")
	groupId := gitlabCli.GetGroupId(targetOrg)

	projects, err := gitlabCli.GetProjects(groupId)
	if err != nil {
		fmt.Errorf(err.Error())
	}

	store := make(map[string]*gitlab.Project)
	for _, project := range projects {
		store[project.Name] = project
	}
	count := 0
	for _, repo := range repos {
		if count > 10 {
			break
		}
		count += 1

		url := repo.HtmlUrl
		name := repo.Name
		namespaceId := groupId
		search := SearchProject(store, repo)
		fmt.Printf("当前项目为%s\n", name)
		if search == nil {
			// 新项目进行重新导入
			p := &gitlab.CreateProjectOptions{
				Name:        gitlab.String(name),
				Path:        gitlab.String(name),
				ImportURL:   gitlab.String(url),
				NamespaceID: gitlab.Int(namespaceId),
				Visibility:  gitlab.Visibility(gitlab.PublicVisibility),
				Mirror:      gitlab.Bool(true),
			}
			_, err := gitlabCli.CreateProject(*p)
			if err != nil {

			}
		} else {
			//	通过commit判断是否需要刷新旧项目 如果id和sha不相同 说明仓库有更新 则更新仓库
			param := &gitlab.ListCommitsOptions{
				All: &[]bool{true}[0],
			}

			commits, err := gitlabCli.ListCommits(search.ID, param)
			if err != nil {

			}

			lastCommitSHA := "lastCommitSHA"
			if len(commits) != 0 {
				lastCommitSHA = commits[len(commits)-1].ID
			}

			commitParam := gitee.GetV5ReposOwnerRepoCommitsOpts{}
			repoCommits, err := giteeCli.ListCommits(sourceOrg, search.Name, &commitParam)
			if err != nil {

			}

			repoCommitSHA := "repoCommitSHA"
			if len(repoCommits) != 0 {
				repoCommitSHA = repoCommits[0].Sha
			}

			if lastCommitSHA == repoCommitSHA {
				// 不用更新
				fmt.Printf("%s项目不需要更新\n", search.Name)
			} else {
				// 删除并更新
				fmt.Printf("删除项目%s\n", search.Name)
				err := gitlabCli.DeleteProject(search.ID)
				if err != nil {

				}
				p := &gitlab.CreateProjectOptions{
					Name:        gitlab.String(name),
					Path:        gitlab.String(name),
					ImportURL:   gitlab.String(url),
					NamespaceID: gitlab.Int(namespaceId),
					Visibility:  gitlab.Visibility(gitlab.PublicVisibility),
					Mirror:      gitlab.Bool(true),
				}

				fmt.Printf("创建项目%s\n", search.Name)
				_, err = gitlabCli.CreateProject(*p)
				if err != nil {

				}
			}
		}

	}

}

func SyncIssue(repos []gitee.Project, targetOrg, sourceOrg string) {
	fmt.Println("开始同步Issue")
	groupId := gitlabCli.GetGroupId(targetOrg)
	projects, err := gitlabCli.GetProjects(groupId)
	if err != nil {
		fmt.Errorf(err.Error())
	}

	store := make(map[string]*gitlab.Project)
	for _, project := range projects {
		store[project.Name] = project
	}
	count := 0
	for _, repo := range repos {
		if count > 10 {
			break
		}
		count += 1

		issues := giteeCli.GetIssues(repo.Namespace.Name, repo.Name)
		iid := 1
		for _, giteeIssue := range issues {
			fmt.Println(giteeIssue)
			var label gitlab.Labels
			for _, giteeLabel := range giteeIssue.Labels {
				label = append(label, giteeLabel.Name)
			}

			gitlabIssue := &gitlab.CreateIssueOptions{
				Title:       &giteeIssue.Title,
				Description: &giteeIssue.Body,
				Labels:      &label,
				IID:         &iid,
			}

			opt := &gitlab.CreateUserOptions{
				Email:               &giteeIssue.User.Email,
				Name:                &giteeIssue.User.Name,
				Username:            &giteeIssue.User.Login,
				ForceRandomPassword: &[]bool{true}[0],
			}

			issuesClient := GetCorrespondClient(*opt)

			issuesClient.CreateIssue(store[repo.Name].ID, *gitlabIssue)

			// state： closed 已关闭 processing 处理中
			if giteeIssue.State == "closed" {
				updateIssue := &gitlab.UpdateIssueOptions{
					StateEvent: &[]string{"close"}[0],
				}
				issuesClient.UpdateIssue(store[repo.Name].ID, iid, *updateIssue)
			}

			notes := giteeCli.GetIssueComment(repo.Namespace.Name, repo.Name, giteeIssue.Number)
			for _, note := range notes {
				opt := &gitlab.CreateUserOptions{
					Email:               &[]string{note.User.Login + "@open.com"}[0],
					Name:                &note.User.Name,
					Username:            &note.User.Login,
					ForceRandomPassword: &[]bool{true}[0],
				}

				tempClient := GetCorrespondClient(*opt)

				tempClient.CreatIssueComment(store[repo.Name].ID, iid, note.Body)
			}
			iid += 1
		}

	}
}

func SyncPr(repos []gitee.Project, targetOrg, sourceOrg string) {
	fmt.Println("开始同步PR")

	groupId := gitlabCli.GetGroupId(targetOrg)
	projects, err := gitlabCli.GetProjects(groupId)
	if err != nil {
		fmt.Errorf(err.Error())
	}

	store := make(map[string]*gitlab.Project)
	for _, project := range projects {
		store[project.Name] = project
	}

	for _, repo := range repos {
		pulls := giteeCli.GetPulls(repo.Namespace.Name, repo.Name)
		for _, pull := range pulls {
			fmt.Println(pull)
		}

	}
}

func GetCorrespondClient(user gitlab.CreateUserOptions) *Client.GitlabClient {
	userToken := ""
	if _, ok := UserMap[*user.Username]; !ok {
		opt := &gitlab.CreateUserOptions{
			Email:               &[]string{*user.Username + "@open.com"}[0],
			Name:                user.Name,
			Username:            user.Username,
			ForceRandomPassword: &[]bool{true}[0],
		}
		newUser, err := gitlabCli.CreatUser(opt)
		if err != nil {

		}
		userToken = newUser.Token
		UserMap[*user.Username] = *newUser
		Dao.CreateUser(newUser)
	}
	userToken = UserMap[*user.Username].Token
	return Client.GetGitlabClient(userToken)
}

func SearchProject(store map[string]*gitlab.Project, repo gitee.Project) *gitlab.Project {
	return store[repo.Name]
}

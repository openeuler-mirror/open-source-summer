package Client

import (
	"github.com/xanzy/go-gitlab"

	"openSummer/Model"
	"openSummer/api"
)

var Gitlab *GitlabClient

type GitlabClient struct {
	Client *gitlab.Client
}

func GetGitlabClient(token string) *GitlabClient {
	opts := gitlab.WithBaseURL("http://81.69.173.136/")
	myGitlabClient, _ := gitlab.NewOAuthClient(token, opts)

	return &GitlabClient{Client: myGitlabClient}
}

func (c *GitlabClient) CreateProject(opts gitlab.CreateProjectOptions) (*gitlab.Project, error) {
	p, _, err := c.Client.Projects.CreateProject(&opts)

	if err != nil {
		return nil, err
	}

	return p, nil
}

func (c *GitlabClient) DeleteProject(id int) error {
	_, err := c.Client.Projects.DeleteProject(id)
	return err
}

func (c *GitlabClient) CreateIssue(pid interface{}, opts gitlab.CreateIssueOptions) error {
	_, _, err := c.Client.Issues.CreateIssue(pid, &opts)
	if err != nil {
		return err
	}

	return nil
}

func (c *GitlabClient) CreatIssueComment(pid interface{}, issueID int, comment string) error {
	opts := &gitlab.CreateIssueNoteOptions{Body: &comment}
	_, _, err := c.Client.Notes.CreateIssueNote(pid, issueID, opts)
	if err != nil {
		return err
	}

	return nil
}

func (c *GitlabClient) CreatUser(opt *gitlab.CreateUserOptions) (*Model.User, error) {
	opt.SkipConfirmation = &[]bool{true}[0]
	user, _, err := c.Client.Users.CreateUser(opt)
	if err != nil {
		return nil, err
	}

	tokenOpt := &gitlab.CreatePersonalAccessTokenOptions{
		Name:   &[]string{"temp"}[0],
		Scopes: &[]string{"api", "read_user", "read_api", "write_repository", "read_repository", "sudo"},
	}

	token, _, err := c.Client.Users.CreatePersonalAccessToken(user.ID, tokenOpt)
	newUser := &Model.User{
		GitlabId:   int64(user.ID),
		Identifier: user.Username,
		Username:   user.Name,
		Email:      user.Email,
		Token:      token.Token,
	}

	return newUser, nil
}

func (c *GitlabClient) UpdateIssue(pid interface{}, issueID int, opts gitlab.UpdateIssueOptions) error {
	_, _, err := c.Client.Issues.UpdateIssue(pid, issueID, &opts)
	if err != nil {
		return err
	}

	return nil
}

func (c *GitlabClient) ListCommits(pid interface{}, opt *gitlab.ListCommitsOptions) ([]*gitlab.Commit, error) {
	var commits []*gitlab.Commit

	page := 1
	for {
		ls := gitlab.ListOptions{
			Page:    page,
			PerPage: 100,
		}
		opt.ListOptions = ls

		p, _, err := c.Client.Commits.ListCommits(pid, opt)

		if err != nil {
			return commits, err
		}

		if len(p) == 0 {
			break
		}

		commits = append(commits, p...)
		page++
	}

	return commits, nil
}

func (c *GitlabClient) GetProjects(gid interface{}) ([]*gitlab.Project, error) {
	var projects []*gitlab.Project

	page := 1
	for {
		ls := gitlab.ListOptions{
			Page:    page,
			PerPage: 100,
		}
		opts := gitlab.ListGroupProjectsOptions{ListOptions: ls}
		prjs, _, err := c.Client.Groups.ListGroupProjects(gid, &opts)

		if err != nil {
			return projects, err
		}

		if len(prjs) == 0 {
			break
		}

		projects = append(projects, prjs...)
		page++
	}

	return projects, nil
}

func (c *GitlabClient) GetGroupId(groupName string) int {
	groups, err := api.GetGroups(c.Client)
	if err != nil {
		// TODO
	}

	groupId := 0
	for _, group := range groups {
		if group.Name == groupName {
			groupId = group.ID
			break
		}
	}

	return groupId
}

package Client

import (
	"context"
	"fmt"

	"github.com/antihax/optional"
	"github.com/opensourceways/go-gitee/gitee"
	"golang.org/x/oauth2"
)

var Gitee *GiteeClient

type GiteeClient struct {
	Client *gitee.APIClient
}

func (c *GiteeClient) GetRepos(SourceOrg string) ([]gitee.Project, error) {
	opt := gitee.GetV5OrgsOrgReposOpts{}
	var r []gitee.Project
	p := int32(1)
	for {
		opt.Page = optional.NewInt32(p)
		ps, _, err := c.Client.RepositoriesApi.GetV5OrgsOrgRepos(context.Background(), SourceOrg, &opt)
		if err != nil {
			return nil, formatErr(err, "list repos")
		}

		if len(ps) == 0 {
			break
		}
		r = append(r, ps...)
		p++
	}

	return r, nil
}

func (c *GiteeClient) GetIssues(owner, repo string) []gitee.Issue {

	var giteeIssues []gitee.Issue
	startPage := 1
	for true {
		params := &gitee.GetV5ReposOwnerRepoIssuesOpts{
			Page:    optional.NewInt32(int32(startPage)),
			PerPage: optional.NewInt32(50),
			State:   optional.NewString("all"),
		}

		resp, _, err := c.Client.IssuesApi.GetV5ReposOwnerRepoIssues(context.Background(), owner, repo, params)
		if err != nil {
			break
		}
		if len(resp) == 0 {
			break
		}
		startPage += 1
		giteeIssues = append(giteeIssues, resp...)
	}
	return giteeIssues
}

func (c *GiteeClient) GetPulls(owner, repo string) []gitee.PullRequest {
	var giteePullRequest []gitee.PullRequest
	startPage := 1
	for true {
		params := &gitee.GetV5ReposOwnerRepoPullsOpts{
			Page:    optional.NewInt32(int32(startPage)),
			PerPage: optional.NewInt32(50),
			State:   optional.NewString("all"),
		}

		resp, _, err := c.Client.PullRequestsApi.GetV5ReposOwnerRepoPulls(context.Background(), owner, repo, params)
		if err != nil {
			break
		}
		if len(resp) == 0 {
			break
		}
		startPage += 1
		giteePullRequest = append(giteePullRequest, resp...)
	}
	return giteePullRequest
}

func (c *GiteeClient) GetIssueComment(owner, repo, number string) []gitee.Note {

	var notes []gitee.Note
	startPage := 1
	for true {
		param := &gitee.GetV5ReposOwnerRepoIssuesNumberCommentsOpts{
			Page:    optional.NewInt32(int32(startPage)),
			PerPage: optional.NewInt32(20),
		}
		resp, _, err := c.Client.IssuesApi.GetV5ReposOwnerRepoIssuesNumberComments(context.Background(), owner, repo, number, param)
		if err != nil {

		}
		if len(resp) == 0 {
			break
		}

		notes = append(notes, resp...)
		startPage += 1

	}
	return notes

}

func (c *GiteeClient) ListCommits(org, name string, opts *gitee.GetV5ReposOwnerRepoCommitsOpts) ([]gitee.RepoCommit, error) {
	var commits []gitee.RepoCommit
	page := 1
	for {
		opts.Page = optional.NewInt32(int32(page))
		opts.PerPage = optional.NewInt32(100)

		repoCommits, _, err := c.Client.RepositoriesApi.GetV5ReposOwnerRepoCommits(context.Background(), org, name, opts)
		if err != nil {
			return commits, err
		}

		if len(repoCommits) == 0 {
			break
		}

		commits = append(commits, repoCommits...)
		page++
	}
	return commits, nil

}

func GetGiteeClient(token string) *GiteeClient {

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)

	conf := gitee.NewConfiguration()
	conf.HTTPClient = oauth2.NewClient(context.Background(), ts)
	c := gitee.NewAPIClient(conf)
	return &GiteeClient{Client: c}
}

func formatErr(err error, doWhat string) error {
	if err == nil {
		return err
	}

	var msg []byte
	if v, ok := err.(gitee.GenericSwaggerError); ok {
		msg = v.Body()
	}

	return fmt.Errorf("failed to %s, err: %s, msg: %q", doWhat, err.Error(), msg)
}

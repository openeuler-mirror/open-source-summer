package api

import (
	"github.com/xanzy/go-gitlab"
)

func GetGroups(client *gitlab.Client) ([]*gitlab.Group, error) {
	var groups []*gitlab.Group

	page := 1
	for {
		ls := gitlab.ListOptions{
			Page:    page,
			PerPage: 100,
		}
		opts := gitlab.ListGroupsOptions{ListOptions: ls}
		grps, _, err := client.Groups.ListGroups(&opts)

		if err != nil {
			return nil, err
		}

		if len(grps) == 0 {
			break
		}

		groups = append(groups, grps...)
		page++
	}
	return groups, nil

}

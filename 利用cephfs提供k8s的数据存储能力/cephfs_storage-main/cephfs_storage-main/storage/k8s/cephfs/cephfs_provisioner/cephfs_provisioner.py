#!/usr/bin/python3

import requests
import os
import getopt
import sys
#chen
from collections import namedtuple
requests.packages.urllib3.disable_warnings()

class CephBaseDriver(object):
    base_url = "https://192.168.57.60:8443"
    username = "tom"
    password = "abc@123"
    create_url = base_url + "/api/cephfsapi/share"
    delete_url = base_url + "/api/cephfsapi/handler_share"
    headers = {
        "Accept": "application/vnd.ceph.api.v1.0+json",
        "Content-Type": "application/json"
    }

    # noinspection PyMethodMayBeStatic
    def request_url(self, url, data):
        resp = requests.post(url, json=data, headers=CephBaseDriver.headers, verify=False)
        if resp.status_code != 200:
            raise Exception("[CephBaseDriver] request:{} failed.".format(url))
        return resp.json()

    def create_share(self, share, user, size):
        raise NotImplemented()

    def delete_share(self, share, user):
        raise NotImplemented()


class CephFsDriver(CephBaseDriver):
    def create_share(self, share, user, size):
        url = self.create_url
        data = {
            "share": share,
            "user": user,
            "size": size,
            "username": self.username,
            "password": self.password,
        }
        return self.request_url(url, data)

    def delete_share(self, share, user):
        url = self.delete_url
        data = {
            "share": share,
            "user": user,
            "username": self.username,
            "password": self.password,
        }
        return self.request_url(url, data)


def usage():
    print("Usage: " + sys.argv[0] + " --remove -n share_name -u ceph_user_id -s size")


def parse_params():
    share, user = str(), str()
    create = True
    size = None
    try:
        opts, args = getopt.getopt(sys.argv[1:], "rn:u:s:", ["remove"])
    except getopt.GetoptError:
        usage()
        sys.exit(1)
    for opt, arg in opts:
        if opt == '-n':
            share = arg
        elif opt == '-u':
            user = arg
        elif opt == '-s':
            size = arg
        elif opt in ("-r", "--remove"):
            create = False
    if share == "" or user == "":
        usage()
        sys.exit(1)
    User_Information = namedtuple('User_Information', ['share', 'user', 'size', 'create'])
    user_information = User_Information(share = share, user = user, size = size, create = create)
    return user_information

def main():
    # 1.parse params
    #share, user, size, create = parse_params()
    #chen
    share = parse_params().share
    user = parse_params().user
    size = parse_params().size
    create = parse_params().create
    cephfs_driver = CephFsDriver()
    if create:
        print(cephfs_driver.create_share(share, user, size))
    else:
        cephfs_driver.delete_share(share, user)


if __name__ == "__main__":
    main()

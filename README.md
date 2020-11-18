# scp-sync
Tool for syncing your progress on some remote machine through scp, while trying to overcome some of the limitation of scp.

# Why 
This tool is made specificaly for the case where you have an ssh jumped/tunneled connection from one machine to some other remote without a constant environnement ( ```Windows -> Windows -> Linux``` for example) and thus not acces to fancy tools like ```rsync``` or ```WinSCP``` . 

The goal is to be able to launch the tool, and develop without thinking of transferring the files to your host for testing. 

# Requirement 

You have to have the ssh connection up and running for this tools to work. You must already be able to ssh from you source host to you destination **WITHOUT ANY LOGGIN NEEDED** and ```scp``` a file the same way. 

For example if you start from a windows host, the file ```~/.ssh/config``` must contains the hosts you want to scp to.

# Limitations

### Scale
Since it only use ```ssh```, ```scp``` and the ```recursive-watch package```, it's not made for huge data transfert or batch modification in a tree.  it's more of a send the change you've made to a file while developping a small to moderate sized project. 

[TBD]

# Planned

- Tests for future pull-requests
- Test of reliability that will be reported here
- Tree creation support

[TBD]

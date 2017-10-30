# opendiff

There are not many free and open-source tool for git diff/merge viewer that I really like. You create one if you can't find one, and this is my attempt to create a tool I like. 

It's quite early version and the only single user is me. But pleaes feel free to leave your feedback or to contribute.

## To install

### Mac

    $ npm run packagemac
    
    $ git config --global diff.tool opendiff
    $ git config --global difftool.opendiff.cmd '~/dev/opendiff/out/opendiff-darwin-x64/opendiff.app/Contents/MacOS/opendiff $LOCAL $REMOTE'
    $ git config difftool.prompt false
    
### Windows

    $ npm run packagewin
    $ git config --global diff.tool opendiff
    $ git config --global difftool.opendiff.cmd '"C:\\dev\\opendiff\\out\\opendiff-win32-ia32\\opendiff.exe" "$LOCAL" "$REMOTE"'
    $ git config difftool.prompt false
  
  




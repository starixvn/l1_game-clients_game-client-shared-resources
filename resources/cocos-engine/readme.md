please put all cocos engine resource here

### How to create a version of cocos engine

- Step 1: Build project.
- Step 2: Copy folder "cocos-js" from folder "build/web-mobile"
- Steo 3: Rename folder by version name
- Step 4: Edit file \_virtual_cc:

* find "scriptPackage" , then see below
  "scriptPackages");return t?Promise.all(t.map((function(t){return e.import(t)})))

  replace : return e.import(t)
  to : return e.import(`${window.location.origin}${window.location.pathname}${t.replace("..", "")}`)

- Step 5: Create the import-map file following this content

```
{
  "imports": {
    "cc": "./../../shared-resources/cocos-engine/<YOUR VERSION>/cc.js?v=1"
  }
}
```

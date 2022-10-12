# website

### Brief Introduction

Website is openEuler community contents management system base on [Vuepress](https://www.vuepress.cn/) framework, [default Theme for Vuepress](https://www.vuepress.cn/theme/default-theme-config.html) theme, which publish on https://www.openeuler.org. Now we are under developing. you are welcome to join us.

### directory structure
docs  
    ├─ .vuepress                   
    │   ├── api                     // api  
    │   ├── component               // vue component  
    │   ├── data                    // data maintained  
    │   ├── lang                    // language module  
    │   ├── libs                    // common utils  
    │   ├── public                  // static resources  
    │   ├── style                   // common style  
    │   ├── theme                   // theme default options  
    │   ├── config.js               // global config  
    │   ├── enhanceApp.js           // app level enhancements  
    │   ├── sitePlugin.js           // plugin  
    ├─ en                          // English content  
    ├─ zh                          // Chinese content  

### Debug

1. Install dependencies

```
npm install
```

2. Run Vuepress development

```
npm run dev
```

The website will serving on http://your-server-ip:8080, any change will take effect here.

3. Run Vuepress production

```
npm run build

```

Copy dist folder to web container

### Contribution

1. Fork the repository
2. Create Feature_xxx branch
3. Commit your code
4. Create Pull Request

### Get Help

- IRC： #openeuler-infra     
- Mail: infra@openeuler.org

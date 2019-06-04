<template>
  <div>
    <div v-for="item in PAGES">
      <div class="content">
        <h2>{{item.title}}</h2>
        <project-table :dataSource="item.branchs">

        </project-table>
      </div>
      <hr>
    </div>
    <div class="content">
      <h2>UI</h2>
      <a href="https://lanhuapp.com/web/#/item?cid=&fid=all" target="_blank">蓝湖</a>
    </div>
    <hr>
    <div class="content">
      <h2>接口</h2>
      <a href="http://gitlab.airdroid.com/airdroid_server/id-airdroid-com/wikis/home" target="_blank">id服务器</a><br/>
      <a href="http://gitlab.airdroid.com/airdroid_server/server-airdroid-com-go/wikis/home"
         target="_blank">go服务器</a>
    </div>
    <hr>
    <div class="content">
      <h2>其他</h2>
      <a href="smb://192.168.40.100" target="_blank">100地址</a><br/>
      <a
        href="http://192.168.40.201:8090/login.jsp?permissionViolation=true&os_destination=%2Fbrowse%2FAD-10079&page_caps=&user_role="
        target="_blank">
        同步网络 JIRA</a><br/>
      <a href="http://lang.airdroid.com/web/"
         target="_blank">
        语言助手</a>
    </div>

    <div class="draw">
      <div class="bg">
      </div>
      <div class="content">
        content
      </div>
    </div>
  </div>
</template>

<script>
  import {PAGES} from '../constant';
  import ProjectTable from '@/components/ProjectTable'

  export default {
    name: "Home",
    components: {ProjectTable},
    data() {
      return {
        drawVisiable: false,
        current: {},
      }
    },
    computed: {
      PAGES() {
        let pages;
        if (!window.localStorage.getItem('pages')) {
          window.localStorage.setItem('pages', JSON.stringify(PAGES));
        } else {
          pages = window.localStorage.getItem('pages');
        }
        return JSON.parse(pages);
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .draw {
    .bg {

    }
    .content {

    }
  }

  div.content {
    margin-left: 30px;
    padding: 10px;
    margin-bottom: 30px;
  }

  div.content a {
    display: inline-block;
  }

  div.content a span {
    margin-left: 10px;
  }

</style>

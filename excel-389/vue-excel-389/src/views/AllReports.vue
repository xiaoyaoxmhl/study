<template>
  <div v-loading="loading">
    <div class="nav">
      <template v-if="Object.keys(user).length">
        <router-link to="/fileUpload">上传报表</router-link>
      </template>
      <template v-else>
        <router-link to="/login">登录</router-link>
      </template>
    </div>
    <template v-if="objToArray.length">
      <div class="item">
        <div class="l">
          选择报表:
        </div>
        <div class="r">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="option" @click="deleteReport(value)" v-if="objToArray.length">
          <span>删除</span>
        </div>
      </div>

      <div class="item">
        <div class="l">
          显示类型:
        </div>
        <div class="r">
          <el-radio v-model="type" label="table">表格</el-radio>
          <el-radio v-model="type" label="statistics">数据统计</el-radio>
        </div>
      </div>
      <!--用表格显示内容-->
      <template v-if="type==='table'">
        <report-table
          v-for="(item,key) in objToArray"
          :key="key"
          :dataSource="item"
          v-if="parseInt(key) === parseInt(value)"
        >
        </report-table>
      </template>
      <template v-if="type ==='statistics'">
        <div class="item">
          <div class="l">
            办理人数:
          </div>
          <div class="r">
            {{currentData.number}}
          </div>
        </div>
        <div class="item algin-start">
          <div class="l">
            办理组成:
          </div>
          <div class="r">
            45元档总计{{currentData.lowNum}}人<br/>
            59元档总计{{currentData.hightNum}}人<br/>
          </div>
        </div>
        <div class="item algin-start">
          <div class="l">
            分红总计:
          </div>
          <div class="r">
            {{currentData.lowNum*15+currentData.hightNum*20}}元<br/>
            45套餐分红：{{currentData.lowNum*15}}元<br/>
            59套餐分红：{{currentData.hightNum*20}}元<br/>
          </div>
        </div>
        <div class="item">
          <div class="l">
            管理员分红:
          </div>
          <div class="r">
            {{currentData.lowNum*10+currentData.hightNum*15}}元<br/>
          </div>
        </div>
        <div class="item algin-start">
          <div class="l">
            办理成员:
          </div>
          <div class="r">
            <span
              v-for="item in currentData.member"
              class="unit"
            >
              {{item}}
            </span>
          </div>
        </div>
      </template>

    </template>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {ajaxHost} from '../constant';
  import ReportTable from './ReportTable';
  import {mapGetters} from 'vuex'
  import {getAllReports, deleteById} from '../api';

  export default {
    name: "AllReports",
    components: {ReportTable},
    mounted() {
      this.init();
    },
    computed: {
      ...mapGetters({
        excelFiles: 'excelFiles',
        user: 'user'
      }),
      currentData() {
        const current = this.excelFiles[this.value];
        const {name, data} = current;
        let member = [], lowNum = 0, hightNum = 0;
        data.forEach(v => {
          const matchAddress = v["地址"].match(/(389号[\u4E00-\u9FA5A-Za-z0-9_]+信息公寓)/gi);
          member.push(matchAddress[0].replace('389号', '').replace('信息公寓', ''))
          if (v['分成'].toString().includes('15')) {
            lowNum++;
          } else {
            hightNum++;
          }
        })
        const result = {
          name: name,
          number: data.length,
          member: member.sort(),
          lowNum,
          hightNum
        }
        return result;
      },
      objToArray() {
        return Object.entries(this.excelFiles).map(([k,v]) => v);
      }

    },
    data() {
      return {
        value: 0,
        options: [],
        type: 'table',//table
        loading: false
      }
    },
    methods: {
      ...mapMutations({
        saveExcelFile: 'saveExcelFile',
      }),
      async init() {
        this.loading = true;
        let res = await getAllReports();
        const {status, data = {}} = res;
        if (status == 200) {

          this.loading = false;
          let arr = [];
          this.options = [];
          let obj = {}
          debugger
          if (data.data && data.data.length) {
            data.data[0].excelData[0].forEach((v, index) => {
                if (!obj[v['月']]) {
                  obj[v['月']] = [];
                }
                obj[v['月']].push(v);
                // arr.push({
                //     name: v.name,
                //     data: v.excelData[0],
                //     id: v.id
                // })
                // this.options.push({
                //     label: v.name,
                //     value: index
                // })

              }
            );
            this.options = Object.keys(obj).map(v => ({
              lable: v + '月',
              value: v
            }))
            this.saveExcelFile(obj);
            this.value = Object.keys(obj).shift();
          }
        }
      },
      async deleteReport(value) {
        try {
          let option = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          let res = await  deleteById({id: this.excelFiles[value].id});

          const {status, data} = res;
          if (status == 200 && data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.init();
            }, 500)
          }

        } catch (e) {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav {
    display: flex;
    padding: 20px 0;
  }

</style>

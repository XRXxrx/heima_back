<template>
  <div class="postPublish">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card" style="margin-top: 20px">
      <el-form ref="form" :model="post" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="post.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <VueEditor :config="config" v-if="post.type === 1" ref="myedit" />
          <el-upload
            class="upload-demo"
            :action="axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            :on-success="videoSuccess"
            v-else
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCcates"
            @change="handleCheckedCatesChange"
          >
            <el-checkbox
              v-for="value in cateList"
              :label="value.id"
              :key="value.id"
              >{{ value.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            :action="axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            list-type="picture-card"
            :on-success="coverSuccess"
            :on-remove="coverRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-button type="primary" @click="publishPost">发布</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCategary, postCatagory } from "@/apis/post";
import axios from "@/utils/request";
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      axios,
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,
      cateList: [], //栏目数据
      checkedCcates: [], // 当前用户所选择的复选框选项值的集合：id集合
      checkAll: false, //全选按钮状态
      isIndeterminate: true, //不确定是否全部选中
      config: {
        // 上传图片的配置
        uploadImage: {
          // 指定处理文件上传的服务器的接口址
          url: axios.defaults.baseURL + "/upload",
          // 后台所需要的参数的名称
          name: "file",
          //   传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },

        // 上传视频的配置
        uploadVideo: {
          url: axios.defaults.baseURL + "/upload",
          name: "file",
          //   传递token
          headers: this.getToken(),
          uploadSuccess(res, insert) {
            console.log(res);
            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },
      },
    };
  },
  async mounted() {
    let res = await getCategary();
    console.log(res);
    this.cateList = res.data.data;
    if (localStorage.getItem("heima_back_token")) {
      this.cateList.splice(0, 2);
    } else {
      this.cateList.splice(0, 1);
    }
  },
  methods: {
    //封面上传
    coverSuccess(response, file, fileList) {
      // console.log(response);
      // 我们要将当前文件存储在服务器中的id添加到cover数组中，并且要注意，它需要存储的是id,且是对象形式
      this.post.cover.push({ id: response.data.id });
    },
    //移除封面,关键是要移除在数据中的存储
    coverRemove(file, fileList) {
      console.log(file, fileList);
      // 获取当前被删除的图片的id
      let id = file.response.data.id;
      this.post.cover = this.post.cover.filter((v) => {
        return v.id !== id;
      });
    },
    //栏目复选框
    handleCheckAllChange(val) {
      // this.checkedCities = val ? cityOptions : [];
      // this.isIndeterminate = false;
      // console.log(val);
      this.checkedCcates = val
        ? this.cateList.map((v) => {
            return v.id;
          })
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCatesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
      // value:就是当前用户所选中的所有复选框所对应的id数组
      // console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cateList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
    },
    //上传视频成功的回调
    videoSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.post.content = axios.defaults.baseURL + response.data.url;
    },
    // 封装设置token的方法
    getToken() {
      return { Authorization: localStorage.getItem("heima_back_token") };
    },
    //点击发布
    async publishPost() {
      // console.log(this.checkedCcates);
      // console.log(publishPost);
      if (this.post.type === 1) {
        // 获取富文本框的内容
        this.post.content = this.$refs.myedit.editor.root.innerHTML;
      }
      // 栏目数据进行改造，改造为对象的形式 [1,2,3] >> [{id:1},{id:2},{id:3}]
      this.post.categories = this.checkedCcates.map((v) => {
        return { id: v };
      });
      // console.log(this.post);
      let res = await postCatagory(this.post);
      console.log(res);
      if (res.data.message === "文章发布成功") {
        this.$message.success(res.data.message);
        this.$router.push({ name: "postList" });
      }
    },
  },
};
</script>

<style>
</style>
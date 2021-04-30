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
          <el-input v-model="post.title"></el-input>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            v-else
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <el-button type="primary" @click="publishPost">发布</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "@/utils/request";
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
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
  methods: {
    // 封装设置token的方法
    getToken() {
      return { Authorization: localStorage.getItem("heima_back_token") };
    },
    //点击发布
    publishPost() {
      // console.log(publishPost);
      if (this.post.type === 1) {
        // 获取富文本框的内容
        this.post.content = this.$refs.myedit.editor.root.innerHTML;
      }
      console.log(this.post);
    },
  },
};
</script>

<style>
</style>
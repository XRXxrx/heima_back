<template>
  <div class="postList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表格 -->
      <el-table :data="postList" border style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="title" label="标题" width="680">
        </el-table-column>
        <el-table-column label="类型" width="80">
          <!-- 凡是在表格中要获取该行对应的数据进行操作，就要用自定义模板 -->
          <template slot-scope="scope">
            {{ scope.row.type === 1 ? "文章" : "视频" }}
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="作者" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPostList } from "@/apis/post";
export default {
  data() {
    return {
      postList: [],
    };
  },
  async mounted() {
    let res = await getPostList();
    console.log(res);
    this.postList = res.data.data;
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="less" scoped>
.postList {
  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
  }
}
</style>
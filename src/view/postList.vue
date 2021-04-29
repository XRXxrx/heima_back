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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="25"
        style="margin-top: 20px; margin-left: 50%; transform: translateX(-50%)"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getPostList } from "@/apis/post";
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 6,
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    //封装获取文章列表请求
    async init() {
      let res = await getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      console.log(res);
      this.postList = res.data.data;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 切换每页显示数量列表时触发
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // val就是当前用户所选择的数量
      // 我们需要做：
      // 1.重置pageSize
      this.pageSize = val;
      // 2.根据重置后的pageSize再次发起数据请求，动态渲染
      this.init();
    },
    // 切换页码时触发
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init();
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
<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input
                style="width: 100%"
                v-model="searchObj.roleName"
                placeholder="角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="fetchData()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetData"
            >重置</el-button
          >
        </el-row>
      </el-form>
    </div>

    <!-- 添加数据 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="addData"
        >添 加</el-button
      >
      <el-button class="btn-add" size="mini" @click="batchRemove()"
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editRole(scope.row.id)"
            title="修改"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
            title="删除"
          />
          <el-button
            type="warning"
            icon="el-icon-baseball"
            size="mini"
            @click="showAssignAuth(scope.row)"
            title="分配权限"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页标签 -->
    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total,sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 40]"
      @size-change="handleSizeChange"
      @current-change="fetchData"
    >
    </el-pagination>
    <!-- 弹框 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysRole"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
          size="small"
          icon="el-icon-refresh-right"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="saveOrUpdate()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/system/role";
export default {
  data() {
    return {
      list: [],
      total: 0, //总记录数
      page: 1, //当前页
      limit: 5, //每页记录数/默认展示5条每页
      searchObj: {}, //条件查询封装的对象
      listLoading: true, // 数据是否正在加载

      dialogVisible: false, //弹出框
      sysRole: {}, //封装添加表单的数据
      selections: [], //批量删除多选框中传入的多选数据

      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    //调用列表方法
    this.fetchData();
  },
  methods: {
    //跳转分配菜单权限
    showAssignAuth(row) {
      this.$router.push(
        "/system/assignAuth?id=" + row.id + "&roleName=" + row.roleName
      );
    },
    //改变页面数据多少
    handleSizeChange(limitChange) {
      this.limit = limitChange;
      this.fetchData();
    },
    //批量删除
    batchRemove() {
      if (this.selections.length === 0) {
        this.$message.warning("请选择要删除的记录!");
        return;
      }
      this.$confirm("您确定要删除选定的数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var idList = [];
        for (var i = 0; i < this.selections.length; i++) {
          var obj = this.selections[i];
          idList.unshift(obj.id);
        }
        api.batchDelete(idList).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchData();
        });
      });
    },
    //复选框发生变化执行此方法
    handleSelectionChange(selectionData) {
      this.selections = selectionData;
    },
    //条件分页查询列表
    //pageNum：当前页
    fetchData(pageNum = 1) {
      this.page = pageNum;
      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.listLoading = false;
          //每页数据列表
          this.total = response.data.total;
          //总记录数
          this.list = response.data.records;
        });
    },

    resetData() {
      //清空表单
      this.searchObj = {};
      //查询所有数据
      this.fetchData();
    },
    //删除记录
    removeDataById(id) {
      this.$confirm("您确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.removeRole(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchData();
        });
      });
    },
    //点击添加弹出框
    addData() {
      this.dialogVisible = true;
      this.sysRole = {};
    },
    //点击确定（既可以做添加也可以做修改）
    saveOrUpdate() {
      const s = !this.sysRole.id;
      //判断添加还是修改
      if (!this.sysRole.id) {
        this.saveRole();
      } else {
        this.updateRole();
      }
    },
    //添加的方法
    saveRole() {
      api.addRole(this.sysRole).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //关闭弹框
        this.dialogVisible = false;
        //刷新页面
        this.fetchData();
      });
    },
    //点击修改
    editRole(id) {
      //弹出框
      this.dialogVisible = true;
      //展示原数据,根据id查询出数据
      api.selectById(id).then((response) => {
        this.sysRole = response.data;
      });
    },
    //点击确定后修改
    updateRole() {
      api.updateRole(this.sysRole).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //关闭弹框
        this.dialogVisible = false;
        //刷新页面
        this.fetchData();
      });
    },
  },
};
</script>

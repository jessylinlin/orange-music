<template>
  <h1>{{ msg }}</h1>
  <p>etststs</p>
  <my-button></my-button>
  <el-button type="text" @click="dialogVisible = true"
    >点击打开 Dialog</el-button
  >
  <teleport to="body">
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </teleport>

  <button @click="showButton">展示异步组件</button>
  <template v-if="isShowButton">
    <Suspense>
      <template #default>
        <AsyncButton></AsyncButton>
      </template>
      <template #fallback>
        <div>组件加载中...</div>
      </template>
    </Suspense>
  </template>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  defineAsyncComponent,
} from "vue";
import Button from "../components/button.vue";
export default defineComponent({
  components: {
    "my-button": Button,
    AsyncButton: defineAsyncComponent({
      delay: 100,
      timeout: 3000,
      loader: () => import("../components/button.vue"),
      //errorComponent: ErrorComponent,
      onError(error, retry, fail, attempts) {
        if (attempts <= 3) {
          retry();
        } else {
          fail();
        }
      },
    }),
  },
  data() {
    return {
      msg: "About Page",
      dialogVisible: false,
    };
  },
  setup(props, context) {
    const user = reactive({
      name: "about",
      age: 18,
    });

    const isShowButton = ref(false);

    function showButton() {
      setTimeout(() => {
        isShowButton.value = true;
      }, 1000);
    }
    return { user, isShowButton, showButton };
  },
  methods: {
    sendApp() {
      let data = "给原生传值";
      //调用原生方法  给原生传data值  然后接收原生回传回来的值
      this.$bridge.callhandler("testMethod", data, (fromNativeData) => {
        // 处理返回数据
        this.operatorId = fromNativeData;
      });
    },
  },
  mounted() {
    //注册js方法供OC调用
    this.$bridge.registerhandler("showAlert", (data, responseCallback) => {
      this.operatorId = data; //接收原生回传过来的值
      responseCallback("https://www.baidu.com"); //把值返回给原生
    });
  },
});
</script>
<style scoped>
p:focus-visible {
  outline: -webkit-focus-ring-color auto 1px;
}
p::selection {
  color: cyan;
}
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>

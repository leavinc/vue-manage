<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // 通过服务器返回的roles，选择呈现哪个组件，如果包含admin，则为adminDashboard，否则为editorDashboard
    if (this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

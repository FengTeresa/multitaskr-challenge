<template>
  <b-container fluid>
    <h3>{{ $t('leadsIn') }}</h3>
    <b-row>
      <b-form-group
        label-cols-sm="1"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="filter"
            class="input-search"
            type="search"
            :placeholder="$t('searchDealId')"
          ></b-form-input>
          <b-input-group-append>
            <span class="input-group-text span-icon"
              ><b-icon icon="search"></b-icon
            ></span>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group
        label-cols-sm="1"
        label-align-sm="right"
        label-size="sm"
        label-for="sortBySelect"
        class="mb-0 select-day-lead"
      >
        <b-input-group size="sm">
          <b-form-select
            id="sortBySelect"
            v-model="sortBy"
            :options="options"
            class="w-75"
            :disabled="selectDateLeads"
            @change="selectDateLeadsChange"
          >
          </b-form-select>
        </b-input-group>
      </b-form-group>
    </b-row>

    <b-form-group class="toggle-form-group">
      <b-button
        :style="{
          background:
            'url(' +
            require('@/assets/icons/' + arrowToday + '.png') +
            ') no-repeat',
        }"
        class="toggle-button"
        @click="handleToggleBtn('today')"
      >
      </b-button>
      <label class="toggle-label"> {{ $t('today') }} </label>
    </b-form-group>

    <today-table ref="todayTable" />

    <b-form-group class="toggle-form-group">
      <b-button
        :style="{
          background:
            'url(' +
            require('@/assets/icons/' + arrowYesterday + '.png') +
            ') no-repeat',
        }"
        class="toggle-button"
        @click="handleToggleBtn('yesterday')"
      >
      </b-button>
      <label class="toggle-label"> {{ $t('yesterday') }} </label>
    </b-form-group>

    <yesterday-table ref="yesterdayTable" />

    <b-form-group class="toggle-form-group">
      <b-button
        :style="{
          background:
            'url(' +
            require('@/assets/icons/' + arrowEverythingE + '.png') +
            ') no-repeat',
        }"
        class="toggle-button"
        @click="handleToggleBtn('everything else')"
      >
      </b-button>
      <label class="toggle-label"> {{ $t('everythingElse') }} </label>
    </b-form-group>

    <everything-else-table ref="everithinETable" />
  </b-container>
</template>

<script>
import TodayTable from '@/components/leadsIn/todayTable'
import YesterdayTable from '@/components/leadsIn/yesterdayTable'
import EverythingElseTable from '@/components/leadsIn/everythingElseTable'

export default {
  components: {
    TodayTable,
    YesterdayTable,
    EverythingElseTable,
  },
  data() {
    return {
      selectDateLeads: true,
      arrowToday: 'arrow-up',
      arrowYesterday: 'arrow-up',
      arrowEverythingE: 'arrow-up',
      options: [
        { value: 'All', text: this.$t('all') },
        { value: 'Today', text: this.$t('today') },
        { value: 'Yesterday', text: this.$t('yesterday') },
        { value: 'Everything else', text: this.$t('everythingElse') },
      ],
      actions: [{ title: this.$t('edit') }, { title: this.$t('remove') }],
      sortBy: 'All',
      filter: null,
    }
  },
  updated() {
    if (
      !this.$refs.todayTable.todayButton ||
      !this.$refs.yesterdayTable.yesterdayButton ||
      !this.$refs.everithinETable.everythingEButton
    ) {
      this.selectDateLeads = false
    } else if (
      this.$refs.todayTable.todayButton &&
      this.$refs.yesterdayTable.yesterdayButton &&
      this.$refs.everithinETable.everythingEButton
    ) {
      this.selectDateLeads = true
    }

    this.$refs.todayTable.filter = this.filter
    this.$refs.yesterdayTable.filter = this.filter
    this.$refs.everithinETable.filter = this.filter
  },
  methods: {
    handleToggleBtn(value) {
      switch (value) {
        case 'today':
          if (this.$refs.todayTable.todayButton) {
            this.$refs.todayTable.todayButton = false
            this.arrowToday = 'arrow-down'
            this.selectDateLeads = false
          } else {
            this.$refs.todayTable.todayButton = true
            this.arrowToday = 'arrow-up'
          }
          break
        case 'yesterday':
          if (this.$refs.yesterdayTable.yesterdayButton) {
            this.$refs.yesterdayTable.yesterdayButton = false
            this.arrowYesterday = 'arrow-down'
            this.selectDateLeads = false
          } else {
            this.$refs.yesterdayTable.yesterdayButton = true
            this.arrowYesterday = 'arrow-up'
          }
          break
        case 'everything else':
          if (this.$refs.everithinETable.everythingEButton) {
            this.$refs.everithinETable.everythingEButton = false
            this.arrowEverythingE = 'arrow-down'
            this.selectDateLeads = false
          } else {
            this.$refs.everithinETable.everythingEButton = true
            this.arrowEverythingE = 'arrow-up'
          }
          break
        default:
      }
    },
    selectDateLeadsChange() {
      switch (this.sortBy) {
        case 'All':
          this.$refs.todayTable.todayButton = true
          this.$refs.yesterdayTable.yesterdayButton = true
          this.$refs.everithinETable.everythingEButton = true
          this.arrowToday = 'arrow-up'
          this.arrowYesterday = 'arrow-up'
          this.arrowEverythingE = 'arrow-up'
          this.sortBy = 'All'
          break
        case 'Today':
          this.$refs.todayTable.todayButton = true
          this.$refs.yesterdayTable.yesterdayButton = false
          this.$refs.everithinETable.everythingEButton = false
          this.arrowToday = 'arrow-up'
          this.arrowYesterday = 'arrow-down'
          this.arrowEverythingE = 'arrow-down'

          break
        case 'Yesterday':
          this.$refs.todayTable.todayButton = false
          this.$refs.yesterdayTable.yesterdayButton = true
          this.$refs.everithinETable.everythingEButton = false
          this.arrowToday = 'arrow-down'
          this.arrowYesterday = 'arrow-up'
          this.arrowEverythingE = 'arrow-down'
          break
        case 'Everything else':
          this.$refs.todayTable.todayButton = false
          this.$refs.yesterdayTable.yesterdayButton = false
          this.$refs.everithinETable.everythingEButton = true
          this.arrowToday = 'arrow-down'
          this.arrowYesterday = 'arrow-down'
          this.arrowEverythingE = 'arrow-up'
          break
        default:
      }
    },
  },
}
</script>
<style>
.table {
  box-shadow: 0 0 10px 5px #adadad70;
}
</style>

<template>
  <b-container fluid class="container-table">
    <div v-if="yesterdayButton">
      <b-table
        outlined
        show-empty
        small
        hover
        stacked="md"
        :items="yesterdayData"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template #head(name)="data">
          <span class="header-labels">{{ data.label }}</span>
        </template>
        <template #head(email)="data">
          <span class="header-labels">{{ data.label }}</span>
        </template>
        <template #head(phone)="data">
          <span class="header-labels">{{ data.label }}</span>
        </template>
        <template #head(verticals)="data">
          <span class="header-labels">{{ data.label }}</span>
        </template>
        <template #head(updated)="data">
          <span class="header-labels">{{ data.label }}</span>
        </template>

        <template #cell(dateTime)="row">
          <div v-if="row.value.time" class="col-img">
            <b-img
              v-bind="imgProps"
              src="@/assets/icons/calendar-mark.png"
              rounded
              class="img-user"
            />
            {{ $moment(row.value.time, 'h:mm').format('h:mm a') }}
          </div>

          <div v-if="!row.value.time" class="col-img">
            <b-img
              v-bind="imgProps"
              src="@/assets/icons/calendar-no-mark.png"
              rounded
              class="img-user"
            />
            <label class="mr-sm-2 sub-label"> {{ $t('taken') }} </label>
          </div>
        </template>

        <template #cell(name)="row">
          <b-row>
            <b-col sm="2" class="col-img">
              <b-img
                v-if="row.item.img"
                v-bind="imgProps"
                :src="row.item.img"
                rounded="circle"
              />
              <avatar
                v-if="!row.item.img"
                :username="row.value.first + ' ' + row.value.last"
                background-color="#e5e5e5"
                :size="35"
              />
            </b-col>
            <b-col>
              <b-row>
                <label class="mr-sm-2 names-label"
                  >{{ row.value.first }} {{ row.value.last }}</label
                >
              </b-row>
              <b-row>
                <label class="mr-sm-2 sub-label">{{ $t('dealId') }}</label>
                {{ row.item.dealID }}
              </b-row>
            </b-col>
          </b-row>
        </template>

        <template #cell(verticals)="row">
          <div v-if="row.value.length <= 2">
            <ul class="list-inline d-inline-block mb-2">
              <li
                v-for="(value, key) in row.value"
                :key="key"
                class="list-inline-item"
              >
                <div v-if="key === 0">
                  <b-badge class="tag-main-badge">{{ value }}</b-badge>
                </div>
                <div v-if="key > 0">
                  <b-badge class="tag-badge">{{ value }}</b-badge>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="row.value.length >= 3">
            <ul class="list-inline d-inline-block mb-2">
              <li
                v-for="(value, key) in row.value"
                :key="key"
                class="list-inline-item"
              >
                <div v-if="key === 0">
                  <b-badge class="tag-main-badge">{{ value }}</b-badge>
                </div>
                <div v-if="key > 0">
                  <b-badge class="tag-badge">{{ value }}</b-badge>
                </div>
              </li>
            </ul>
            <b-img
              src="@/assets/icons/arrow-down.png"
              rounded
              class="vertical-arrow"
            />
          </div>
        </template>

        <template #cell(updated)="row">
          {{ $moment(row.value, 'DD/MM/YYYY').format('MMM DD') }}
        </template>

        <template #cell(actions)>
          <b-dropdown text="..." no-caret class="dropdown-button">
            <b-dropdown-header tag="div" class="text-center">
            </b-dropdown-header>
            <b-dropdown-item v-for="entry in actions" :key="entry.title">
              <i :class="entry.flag" /> {{ entry.title }}
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import Avatar from 'vue-avatar'
import moment from 'moment'
import { customers } from '@/assets/javascripts/data.js'

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      yesterdayButton: true,
      imgProps: {
        width: 40,
        height: 40,
        class: 'm1',
      },
      yesterdayData: [],
      actions: [{ title: this.$t('edit') }, { title: this.$t('remove') }],
      dataSource: customers,
      fields: [
        {
          key: 'dateTime',
          label: '',
          sortable: true,
          sortDirection: 'desc',
          class: 'border-right',
        },
        {
          key: 'name',
          label: this.$t('name'),
          sortable: true,
        },
        {
          key: 'email',
          label: this.$t('email'),
          sortable: true,
        },
        {
          key: 'phone',
          label: this.$t('phone'),
          sortable: true,
        },
        {
          key: 'verticals',
          label: this.$t('verticals'),
          sortable: true,
        },
        {
          key: 'updated',
          label: this.$t('updated'),
          sortable: true,
        },
        { key: 'actions', label: '', class: 'text-center' },
      ],
      totalRows: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  created() {
    this.handleGetYesterdayData()
  },
  mounted() {
    this.totalRows = this.dataSource.length
  },
  methods: {
    handleGetYesterdayData() {
      for (const value of Object.values(this.dataSource)) {
        if (
          moment(value.dateTime.date, 'DD/MM/YYYY')
            .startOf('day')
            .calendar() ===
          moment().subtract(1, 'days').startOf('day').calendar()
        ) {
          this.yesterdayData.push(value)
        }
      }
    },
  },
}
</script>

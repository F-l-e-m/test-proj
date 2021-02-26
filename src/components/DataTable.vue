<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns"
              :key="column.prop"
              :width="column.width">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayedPosts"
            :key="row.id">
          <td>{{ row.id }}</td>
          <td><input type="date" :value="row.date" @input="handleDate($event, row.id)"></td>
          <td>{{ row.name }}</td>
          <td><input type="number" :value="row.amount" @input="handleAmount($event, row.id)"></td>
        </tr>
      </tbody>
    </table>

    <div class="data-table__paginator">
      <data-paginator
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    displayedPosts() {
      return this.paginate(this.rows);
    },
  },
  methods: {
    ...mapMutations([
      'setPayments',
      'setCache',
    ]),
    handleDate(event, id) {
      this.rows[id - 1].date = event.target.value;
      this.setPayments(this.rows);
      this.setCache('payments');
    },
    handleAmount(event, id) {
      this.rows[id - 1].amount = event.target.value;
      this.setPayments(this.rows);
      this.setCache('payments');
    },
    paginate(payments) {
      const from = (this.page * this.pageSize) - this.pageSize;
      const to = (this.page * this.pageSize);
      return payments.slice(from, to);
    },
  },
};
</script>

<style>
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
  }

  table th {
    padding: 6px 0;
    border: 1px solid gray;
  }

  table td {
    padding: 10px 0;
    border: 1px solid gray;
  }

  input {
    background-color: transparent;
    text-align: center;
    border: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

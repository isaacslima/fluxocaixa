<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1>Saídas</h1>
      </v-col>
      <v-col class="mb-4">
        
      </v-col>

      <v-col cols="12">

      <template>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      headers: [
        {
          text: 'Descrição',
          align: 'start',
          sortable: false,
          value: 'description',
        },
        { text: 'Data', value: 'date' },
        { text: 'Valor', value: 'value' },
        { text: 'Forma de Pagamento', value: 'paymentMethod' },
      ],
      desserts: [
        {
          description: 'Conta de luz',
          date: '10/08/2020',
          value: 53.90,
          paymentMethod: 'Boleto',
        },
      ],
    }),
  }
</script>

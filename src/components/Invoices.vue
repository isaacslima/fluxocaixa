<template>
	<v-container>
		<v-row>
				<v-col class="mb-6">
					<h1>Entradas</h1>
				</v-col>
				<v-col class="mb-6">
					<v-btn small color="primary" @click="editting = true" v-if="!editting">Nova entrada</v-btn>
				</v-col>
			</v-row>
		<v-row v-if="editting">
			<v-row>
				<v-col class="md-4 xs-12">
					<v-text-field label="Descrição" solo v-model="newInvoice.description"></v-text-field>
				</v-col>
				<v-col class="md-2 xs-12">
					<v-text-field label="Data" solo v-model="newInvoice.date"></v-text-field>
				</v-col>
				<v-col class="md-2 xs-12">
					<v-text-field label="Valor" solo v-model="newInvoice.value"></v-text-field>
				</v-col>
				<v-col class="md-4 xs-12">
					<v-text-field label="Forma de Pagamento" solo v-model="newInvoice.paymentMethod"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-btn small color="secondary" @click="insertInvoice()">Incluir Entrada</v-btn>
				</v-col>
			</v-row>
		</v-row>
		<v-row>
			<v-col cols="12">
				<template>
					<v-data-table :headers="headers" :items="invoices" :items-per-page="5" class="elevation-1"></v-data-table>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { invoicesRef } from '../firebase';

export default {
	name: 'Invoices',
	data: () => ({
		invoices: [],
		editting: false,
		newInvoice: {
			description: '',
			date: '',
			value: '',
			paymentMethod: ''
		},
		dialog: false,
		keyExclusao: null,
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
	}),
	methods: {
		editInvoice(key) {
			//this.$router.replace(`/addedit-invoice/${key}`);
			console.log(key);
		},
		insertInvoice() {
      const dados = {
        description: this.newInvoice.description,
        date: this.newInvoice.date,
        value: this.newInvoice.value,
        paymentMethod: this.newInvoice.paymentMethod,
      };
			invoicesRef.push().set({
				description: dados.description,
				date: dados.date,
				value: dados.value,
				paymentMethod: dados.paymentMethod,
			});
			this.newInvoice.description = '';
			this.newInvoice.date = '';
			this.newInvoice.value = '';
			this.newInvoice.paymentMethod = '';
			this.editting = false;
    },
		confirmRevoveInvoice(key){
			this.dialog = true;
			this.keyExclusao = key;
		},
		removeInvoice() {
			invoicesRef.child(this.keyExclusao).remove();
			this.dialog = false;
		},
	},
	beforeMount() {
		const self = this;
		invoicesRef.on('child_added', (snapshot) => {
			const invoice = {
				key: snapshot.key,
				description: snapshot.val().description,
				date: snapshot.val().date,
				value: snapshot.val().value,
				paymentMethod: snapshot.val().paymentMethod,
			};
			self.invoices.push(invoice);
		});
	},
}
</script>

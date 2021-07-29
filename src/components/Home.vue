<template>
	<div class="content">
		<div>
			<label for="webhooksCreate">WebHooks Create</label>
			<input id="webhooksCreate" type="checkbox" v-model="webhooksCreate">
			
			<label for="webhooksUpdate">WebHooks Update</label>
			<input id="webhooksUpdate" type="checkbox" v-model="webhooksUpdate">
			
			<button @click="webHookSet">setWebHook</button>
		</div>
		<div id="upload-file">
			<input type="file" @change="fileUpload" />
			<button @click="sendFile">Charger le Fichier</button>
			<div>
				<span v-for="message in messages">{{message}}</span>
			</div>
		</div>
		<div class="create-set">
			<label for="name">Name</label>
			<input type="text" id="name" v-model="name" />
			
			<label for="sku">SKU</label>
			<input type="text" id="sku" v-model="sku" />
			
			<label for="description">Description</label>
			<input type="text" id="description" v-model="description" />
			
			<button @click="createProduct">
				Create
			</button>
		</div>
		<div class="update-set">
			<label for="id">ID</label>
			<input type="number" id="id" v-model="id"/>
			<label for="updateName">Name</label>
			<input type="text" id="updateName" v-model="updateName" />
			
			<label for="updateSku">SKU</label>
			<input type="text" id="updateSku" v-model="updateSku" />
			
			<label for="updateDescription">Description</label>
			<input type="text" id="updateDescription" v-model="updateDescription" />
			
			<button @click="updateProduct">
				Update
			</button>
		</div>
		<div>
			<div class="filter-set">
				<label for="searchName">Name</label>
				<input type="text" id="searchName" v-model="searchName" />
				
				<label for="searchSku">SKU</label>
				<input type="text" id="searchSku" v-model="searchSku" />
				
				<label for="searchDescription">Description</label>
				<input type="text" id="searchDescription" v-model="searchDescription" />
				
				<label for="status">Description</label>
				<input type="text" id="status" v-model="status" />
				
				<button @click="filterProducts">
					Filter
				</button>
			</div>
			<div class="search-set">
				<label for="search">Search</label>
				<input type="text" id="search" v-model="search" />
				
				<button @click="searchProducts">
					Search
				</button>
			</div>
			<div id="products">
				<h3>
					<button @click="listProducts">List Products</button>
					<button @click="deleteProducts">Delete Products</button>
					Products
					<span v-if="fetchMessage">
						------ {{this.fetchMessage}} ----------
					</span>
				</h3>
				<table style="width:100%">
					<tr>
						<th>id</th>
						<th>Name</th>
						<th>Sku</th>
						<th>Status</th>
						<th>Description</th>
					</tr>
					<template v-if="products != []">
						<tr v-for="product in products" :key="product.id">
							<td>{{product.id}}</td>
							<td>{{product.name}}</td>
							<td>{{product.sku}}</td>
							<td>{{product.status ? 'Active' : 'Inactive'}}</td>
							<td>{{product.description}}</td>
						</tr>
					</template>
					<tbody v-else>
						<div>No products ................</div>
					</tbody>
				</table>
			</div>
		</div>
	
	
	</div>
</template>

<script>
    import {Api} from "../helpers";

    export default {
        name: "Home",
        data() {
            return {
                products: [],
                file: null,
                searchName: '',
                searchSku: '',
                searchDescription: '',
                name: '',
                sku: '',
                description: '',
                updateName: '',
                updateSku: '',
                updateDescription: '',
                status: '',
                search: '',
                fetchMessage:'',
	            messages:[],
	            isConnected:false,
	            id:'',
                webhooksCreate:false,
	            webhooksUpdate:false
            }
        },
	    sockets: {
            connect() {
                // Fired when the socket connects.
                this.isConnected = true;
                console.log("Socket connected")
            },

            disconnect() {
                this.isConnected = false;
            },

            // Fired when the server sends something on the "messageChannel" channel.
            test(data) {
                this.messages.push(data.message)
	            console.log(data)
            }
        },
        created() {},
        mounted() {
        
        },
        watch: {},
        computed: {},
        methods: {
            fileUpload(event) {
                this.file = event.target.files[0]
            },
            sendFile() {
                const params = new FormData()
                params.append('file', this.file, this.file.name)
                Api.post('/upload-file', params)
	            this.file = null
            },
            filterProducts() {
                this.fetchMessage = "Fetching Filter Products"
                const params = {}
                if (this.searchName != '') {
                    params['name'] = this.searchName
                }
                if (this.searchSku != '') {
                    params['sku'] = this.searchSku
                }
                if (this.searchDescription != '') {
                    params['description'] = this.searchDescription
                }
                if (this.status != '') {
                    params['status'] = this.status == 'active'
                }
                if(params == {}) return
                Api.get('/products', params).then(res => {
                    let elts = res.data
                    if (elts) {
                        this.fetchMessage = "Fetching Terminated !!!!"
                        this.products = elts
                    }
                })
            },
            searchProducts() {
                this.fetchMessage = "Fetching Filter Products"
                const params = {}
                if (this.search != '') {
                    params['search'] = this.search
                }

                Api.get('/products', params).then(res => {
                    if (res.data) {
                        this.fetchMessage = "Fetching Terminated !!!!"
                        this.products = res.data
                    }
                })
            },
	        createProduct(){
                const params = {}
                if (this.name != '') {
                    params['name'] = this.name
                }
                if (this.sku != '') {
                    params['sku'] = this.sku
                }
                if (this.description != '') {
                    params['description'] = this.description
                }
                Api.post('/product', params).then(res => {
                    if(res.data){
                        this.fetchMessage = "Product Created"
                    }
                }).then(()=>{

                    this.name = ''
                    this.sku = ''
                    this.description = ''
                })
                
	        },
	        updateProduct(){
                const params = {}
                if (this.updateName != '') {
                    params['name'] = this.updateName
                }
                if (this.updateSku != '') {
                    params['sku'] = this.updateSku
                }
                if (this.updateDescription != '') {
                    params['description'] = this.updateDescription
                }
                Api.put(`/product/${this.id}`, params).then(res => {
                    if(res.data){
                        this.fetchMessage = "Product Updated"
                    }
                }).then(()=>{

                    this.updateName = ''
                    this.updateSku = ''
                    this.updateDescription = ''
                })
	        },
	        listProducts(){
                Api.get('/products').then(res => {
                    if (res.data) {
                        this.products = res.data
                        this.fetchMessage = "Fetching Terminated !!!!"
                    }
                })
	        },
	        deleteProducts(){
                Api.delete('/del-products').then(res =>{
                    if (res.data){
                        this.products = []
                        this.fetchMessage = "Deleted Terminated"
	                    
                    }
                })
	        },
            webHookSet(){
                const params = {}
                params['name'] = 'user'
                params['create_trigger'] = this.webhooksCreate
                params['update_trigger'] = this.webhooksUpdate
                Api.put(`/webhook/user`, params).then(res => {
                    if(res.data){
                        this.fetchMessage = "WebHooks Updated"
                    }
                }).then(()=>{

                    this.webhooksCreate = false
                    this.webhooksUpdate = false
                })
            }
        }
    }
</script>

<style scoped>
	
	.content{
		background-color: #e2e2e2;
		padding: 30px 0;
	}
	
	.content > div{
		padding: 20px 0;
	}
	
	.filter-set{
		margin: 10px 0;
	}
	
	.filter-set > input, .search-set > input, .create-set > input, .update-set > input{
		margin-right: 15px;
		margin-left: 5px;
	}
	
	table, th, td{
		border: 1px solid black;
		border-collapse: collapse;
	}
	
	#products tr:nth-child(even){
		background-color: #eee;
	}
	
	#products tr:nth-child(odd){
		background-color: #fff;
	}
	
	#products th{
		color: white;
		background-color: #5f5f5f;
	}
	
	#products table > tr > td:last-child{
		max-width: 75px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	th, td{
		padding: 5px;
	}
	
	#products{
		height: 500px !important;
		overflow-y: auto;
	}
	#upload-file > div > span:last-child{
		color: green !important;
	}
	tbody div{
		padding: 20px;
	}
</style>
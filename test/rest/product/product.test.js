const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token');
});

it('API - deve adicionar um produto corretamente', async () => {
    await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Câmera Digital",
            "price": "299.99",
            "quantity": "10",
            "categories": ["1", "2"],
            "description": "Uma câmera digital de alta qualidade",
            "photos": ["url1.jpg", "url2.jpg"],
            "popular": true,
            "visible": true,
            "location": "Online",
            "additionalDetails": "Garantia de 1 ano",
            "specialPrice": "249.99"
        })
        .expectStatus(200)
        .expectJson('success', true);
});

it('API - deve editar um produto corretamente', async () => {
    await spec()
        .put('/api/editProduct/1')  
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Câmera Digital Plus",
            "price": "350.00",
            "quantity": "15",
            "categories": ["1"],
            "description": "Uma câmera digital atualizada",
            "photos": ["url3.jpg"],
            "popular": false,
            "visible": false,
            "location": "Loja física",
            "additionalDetails": "Garantia de 2 anos",
            "specialPrice": "300.00"
        })
        .expectStatus(200)
        .expectJson('success', true);
});

it('API - deve deletar um produto corretamente', async () => {
    await spec()
        .delete('/api/deleteProduct/1')  
        .withHeaders("Authorization", token)
        .expectStatus(200)
        .expectJson('success', true);
});

const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');


describe('API de Loja - Testes de Categorias', () => {
    
    let token;
    beforeEach(async () => {
        token = await spec()
            .post('/public/authUser')
            .withJson({
                "email": "admin@admin.com",
                "password": "admin123"
            })
            .returns('data.token')
    })

    it('deve adicionar uma categoria corretamente', async () => {
      await spec()
        .post('/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Iphone 15",
            "photo": "https://wantimport.com/wp-content/uploads/2023/11/apple_iphone_15_plus_azul_01.jpeg.webp"  
        })
        .expectStatus(200)
        .expectJson('success', true);
    });
  
    it('API - deve editar uma categoria corretamente', async () => {
        await spec()
            .put('/api/editCategory/2')  
            .withHeaders("Authorization", token)
            .withJson({
                "name": "Tablet Samsung",
                "photo": "https://imgs.casasbahia.com.br/1565697320/1xg.jpg?imwidth=96" 
            })
            .expectStatus(200)
            .expectJson('success', true);
    });
  
    it('API - deve deletar uma categoria corretamente', async () => {
        await spec()
            .delete('/api/deleteCategory/1')  
            .withHeaders("Authorization", token)
            .expectStatus(200)
            .expectJson('success', true);
    });
});
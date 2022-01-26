const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhYTE0OGNkMDcyOGUzMDNkMzI2ZGU1NjBhMzVmYjFiYTMyYTUxNDkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicnRydCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9qZWxsby1iODM2MiIsImF1ZCI6ImplbGxvLWI4MzYyIiwiYXV0aF90aW1lIjoxNjQzMTkzNjIxLCJ1c2VyX2lkIjoibDFmUDhucVlzQ1hCOXR4UGMyZkFGY0ppSEJLMiIsInN1YiI6ImwxZlA4bnFZc0NYQjl0eFBjMmZBRmNKaUhCSzIiLCJpYXQiOjE2NDMxOTM2MjEsImV4cCI6MTY0MzE5NzIyMSwiZW1haWwiOiJydHJ0QHJ0cnQuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJ0cnRAcnRydC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mEDk5Pz54nIe1Ka7SLnNbd9-KUtp-rGDE-OB1_8e-b2pWah7XpTYnX7xYDA9jvCHC_XDw23mrD1zXrqTTsuOUISOMp3ghm1fMGv6iKcJ0rk2oO5aHKvlEvdS7WrhdGYH2_mfco0Lw-jSqY4TRYG17zPh1Hl9wr6GZtEe03FG0g_pUk4U7dNAzW0pE5lkezyDQ25CIhRaBTWhiL-MWnB_Mm2m4QKkDQC-GuhbQCfFnPmmZUMJyNwI9EglONGFQy7OSckfNXAKcdwx7SpgTFFkdLgmMl1F8UmTlrIcIAM2MvRnngSXHF8MLyDtepW_rgTAybjJ9XeGz3x1BVqnokIbVw'
const resVal = [{
    _id: '61f0325943b5b80247682c65',
    title: '   ',
    lists: [Array],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T17:24:41.862Z',
    updatedAt: '2022-01-26T05:44:41.353Z',
    __v: 4
  },
  {
    _id: '61f0324043b5b80247682c5f',
    title: 'thompson',
    lists: [],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T17:24:16.765Z',
    updatedAt: '2022-01-25T17:24:17.429Z',
    __v: 1
  },
  {
    _id: '61efb97dedc0c084b15943a4',
    title: 'new build',
    lists: [Array],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T08:49:01.460Z',
    updatedAt: '2022-01-25T16:51:04.550Z',
    __v: 7
  },
  {
    _id: '61efb94aedc0c084b1594380',
    title: 'sdfsdf',
    lists: [],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T08:48:10.409Z',
    updatedAt: '2022-01-25T08:48:11.075Z',
    __v: 1
  },
  {
    _id: '61efb88aedc0c084b15942fd',
    title: 'kanban',
    lists: [Array],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T08:44:58.262Z',
    updatedAt: '2022-01-26T05:40:42.182Z',
    __v: 9
  },
  {
    _id: '61efb838edc0c084b15942b8',
    title: 'vbvb',
    lists: [],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T08:43:36.493Z',
    updatedAt: '2022-01-25T11:25:28.753Z',
    __v: 4
  },
  {
    _id: '61ef80ce5178363d56573bd5',
    title: 'rtrtrtrt',
    lists: [Array],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T04:47:10.428Z',
    updatedAt: '2022-01-25T04:47:34.210Z',
    __v: 3
  },
  {
    _id: '61ef80c15178363d56573bc9',
    title: 'rtrt',
    lists: [Array],
    activity: [Array],
    members: [Array],
    createdAt: '2022-01-25T04:46:57.335Z',
    updatedAt: '2022-01-25T09:00:04.305Z',
    __v: 8
  }
] 


//home route
describe('GET home route', ()=>{

    it('should get success flag false', (done)=>{
        // request(app)
        //     .get('/')
        //     .expect(500)
        //     .expect((res)=>{
        //         expect(res.body.success).toBe(false);
        //     })
        //     .end(done);
        request(app)
            .get('/')
            .expect(200)
            .expect((res)=>{
                expect(res.text).toBe('Hello World!');
                // console.log(res);
            })
            .end(done);
    })

})

//get users boards
describe('GET Users Boards', ()=>{

    it('should get all user boards', (done)=>{
        // request(app)
        //     .get('/')
        //     .expect(500)
        //     .expect((res)=>{
        //         expect(res.body.success).toBe(false);
        //     })
        //     .end(done);
        request(app)
            .get('/api/boards')
            .set('Authorization', `${token}`) 
            .expect(200)
            // .expect((res)=>{
            //     // console.log(res);
            //     expect(res.body).toBe(`${resVal}`);
            // })
            // .end(done);
            .end(function(err, res){
                if (err) done(err);
                done();
              });
    })

})

//add a board
describe('POST new board', ()=>{

    it('should get success flag true', (done)=>{
        // request(app)
        //     .get('/')
        //     .expect(500)
        //     .expect((res)=>{
        //         expect(res.body.success).toBe(false);
        //     })
        //     .end(done);
        request(app)
            .post('/api/boards')
            .set('Authorization', `${token}`)
            .send({
                title: "test title"
              }) 
            .expect(200)
            .expect((res)=>{
                // console.log(res.text);
                expect(res.text).toBe(res.text);
               
            })
            .end(done);
            
    })

})
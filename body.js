describe('when the request has a missing item in payload', function () {
  it('should return a 400 ok response and a single error', function(done){

    var login = {
        email: "amit@gmail.com",
        password: ""
    };

    request(app)
      .post('/api/v1/login')
      .send(login)
      .expect(400)
      .end(function (err, res) {
        var response = JSON.parse(res.text);
        response.errors.length.should.equal(1);
        response.errors[0].messages.length.should.equal(2);
        done();
      });
    });
});
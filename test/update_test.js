// Test case for updating records

// load assert and Users
const assert = require('assert');
const Users = require('./../src/user');

describe('Update Records', () => {
  let deva;

  beforeEach(done => {
    deva = new Users({name: 'Devashish', posts: [{title: 'First blog'}]});
    deva.save()
     .then(() => {
       done();
     });
  });


  it('Model Instance set n save', done => {
    deva.set('name', 'Deva');
    deva.save()
     .then(() => {
       Users.find({})
        .then((users) => {
          assert(users.length === 1 && users[0].name === 'Deva');
          done();
        });
     });
  });

  it('Model Instance Update', (done) => {
    deva.update({ name: 'Devla'})
     .then(() => {
       Users.find({})
        .then((users) => {
          assert(users.length === 1 && users[0].name === 'Devla');
          done();
        });
     });
  });

  it('Class based Update', (done) => {
    Users.update({ name: 'Devashish'}, {name: 'Bhailu'})
     .then(() => {
       Users.find({})
        .then((users) => {
          assert(users.length === 1 && users[0].name === 'Bhailu');
          done();
        });
     });
  });

  it('Class based findOneAndUpdate', (done) => {
    Users.findOneAndUpdate({name: 'Devashish'}, {name: 'Geek'})
     .then(() =>{
       Users.find({})
        .then((users) => {
          assert(users.length === 1 && users[0].name === 'Geek');
          done();
        });
     });
  });

  it('Class based findByIdAndUpdate', (done) => {
    Users.findByIdAndUpdate(deva._id, {name: 'Pythonist'})
     .then(() => {
       Users.find({})
        .then((users) => {
          assert(users.length === 1 && users[0].name === 'Pythonist');
          done();
        });
     });
  });

  it('Increase Post Count', done => {
    Users.findOne({name: 'Devashish'})
     .then(user => {
       user.update({postCount: user.postCount + 1})
        . then(updatedUser => {
          done();
        })
     })
  });

  // Increment operator in mongodb
  it('Increment postCount', done => {
    Users.findByIdAndUpdate(deva._id, {$inc: {postCount: 1}})
     . then(() => {
       Users.findById(deva._id)
        .then(user => {
          assert(user.postCount === deva.posts.length)
        });
        done();
     });
  });

});

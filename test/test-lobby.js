var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var should = chai.should();
var LobbyClass = require('../lib/lobby.js');
var RoomClass = require('../lib/room.js');

chai.use(sinonChai);

describe('Lobby Class', function(){

  describe('#createRoom()', function(){

    it('should return a room url', function(){
      var lobby = new LobbyClass.Lobby()
         , stub
         , spy
         ;
      stub = sinon.stub(lobby, 'createUniqueURL', function(){ 
        return 'fakeURL';
      });
      spy = sinon.spy(lobby, 'createRoom');
      lobby.createRoom();
      spy.should.have.returned('fakeURL');
    });

    it('should instantiate a Room', function(){
      var lobby = new LobbyClass.Lobby()
         , stub
         , spy
         ;
      stub = sinon.stub(lobby, 'createUniqueURL', function(){ 
        return 'fakeURL';
      });
      lobby.createRoom();
      lobby.rooms['fakeURL'].should.be.an.instanceof(RoomClass.Room);
    });

    it('should create a unique rooms[room] object', function(){
      var lobby = new LobbyClass.Lobby()
         ;
      Object.keys(lobby.rooms).length.should.equal(0);
      lobby.createRoom();
      Object.keys(lobby.rooms).length.should.equal(1);
      lobby.createRoom();
      Object.keys(lobby.rooms).length.should.equal(2);
      Object.keys(lobby.rooms)[0].should.not.equal(Object.keys(lobby.rooms)[1]);
    });

    it('should return false if the room name already exists', function () {
      var lobby = new LobbyClass.Lobby()
        , stub
        , spy
        ;
      stub = sinon.stub(lobby, 'createUniqueURL', function(){ 
        return 'fake';
      });
      spy = sinon.spy(lobby, 'createRoom');
      lobby.createRoom();
      lobby.createRoom();
      spy.should.have.returned(false)
    });

    it('should define default room values', function(){
      var lobby = new LobbyClass.Lobby();
      var room;
      lobby.createRoom();
      room = Object.keys(lobby.rooms)[0];
      Object.keys(lobby.rooms[room]).length.should.equal(7);
      lobby.rooms[room].should.have.property('createAdmin', true);
      lobby.rooms[room].should.have.property('hasAdmin', false);
      lobby.rooms[room].should.have.property('cardPack', 'fib');
      lobby.rooms[room].should.have.property('clientCount', 0);
      lobby.rooms[room].should.have.property('connections').and.be.empty;
    });
  });

  describe('#createUniqueURL()', function(){
    it('should generate a random 4-character string', function(){
      var lobby = new lobbyClass.Lobby();
      var string = lobby.createUniqueURL();
      string.should.match(/^[0-9a-zA-Z]{4}$/);
    });
  });

  describe('#joinRoom()', function(){
    it('should error if trying to join a non-existent room');
    it('should be a member of the room on success');
    it('should tell other room members that a client has joined');
    it('should return the roomUrl on success');
  });

  describe('#refreshRoomInfo()', function(){
    it('should return information about a specific room');
  });

  describe('#getClientCount()', function(){
    it('should return a count of users currently connected to a room');
  });

  describe('#broadcastDisconnect()', function(){
    it('should error if trying to leave a non-existent room');
    it("should not be a member of the room on success");
    it("should tell other room members that a client has left");
  });
});
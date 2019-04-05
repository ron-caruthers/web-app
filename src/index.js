import './scss/main.scss';

(() => {

  'use strict';

  let app = angular.module('flapperNews', ['ui.router']);

  app.factory('posts', [() => {
    var o = {
      posts: [
        {title: 'post 1', upvotes: 5, comments: [
          {author: 'Joe', body: 'Noice post!'},
          {author: 'Bob', body: 'This is dumb!'}
        ]},
        {title: 'post 2', upvotes: 2, comments: [
          {author: 'Joe', body: 'Cool post!'},
          {author: 'Bob', body: 'Great idea but everything is wrong!'}
        ]},
        {title: 'post 3', upvotes: 15, comments: [
          {author: 'Joe', body: 'You suck!'},
          {author: 'Bob', body: 'Wrong Wrong Wrong!'}
        ]},
        {title: 'post 4', upvotes: 9, comments: [
          {author: 'Joe', body: 'No way!!'},
          {author: 'Bob', body: 'Great ideas!'}
        ]},
        {title: 'post 6', upvotes: 4, comments: [
          {author: 'Joe', body: 'Thanks for this!'},
          {author: 'Bob', body: 'Holy lord!'}
        ]}
      ]
    };
    return o;
  }]);

  app.controller('MainCtrl', ['$scope', 'posts', ($scope, posts) => {
    $scope.posts = posts.posts;
    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: []
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }]);

  app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts',
    ($scope, $stateParams, posts) => {
      $scope.post = posts.posts[$stateParams.id];
      $scope.addComment = function() {
        if ($scope.body === '') { return; }
        $scope.post.comments.push({
          body: $scope.body,
          author: 'user',
          upvotes: 0
        });
        $scope.body = '';
      };
    }
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
    $stateProvider.state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
    $urlRouterProvider.otherwise('home');
  }]);

})();

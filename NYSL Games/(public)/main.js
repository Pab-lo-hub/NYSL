var firebaseConfig = {
  apiKey: "AIzaSyDTWY_SBb5zzUrmO3YWtYfc1Stbuidv4wY",
  authDomain: "nysl-games-a5744.firebaseapp.com",
  databaseURL: "https://nysl-games-a5744.firebaseio.com",
  projectId: "nysl-games-a5744",
  storageBucket: "nysl-games-a5744.appspot.com",
  messagingSenderId: "825928335352",
  appId: "1:825928335352:web:3a484c2c80e8849df2e00d"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
  $(".toggle-accordion").on("click", function () {
    var accordionId = $(this).attr("accordion-id"),
      numPanelOpen = $(accordionId + ' .collapse.in').length;

    $(this).toggleClass("active");

    if (numPanelOpen == 0) {
      openAllPanels(accordionId);
    } else {
      closeAllPanels(accordionId);
    }
  })
})

var app = new Vue({
  el: "#index",
  data: {
    email: "",
    password: "",
    message: "",
    messages: [],
    user: null,
    game: "",
  },

  methods: {
    register: function () {
      firebase.auth().createUserWithEmailAndPassword(app.email, app.password)
        .then(function () {
          alert("You are registered now")
        })
        .catch(function (error) {
          // Handle Errors here.
          alert(error.message);
        });
    },
    login: function () {
      firebase.auth().signInWithEmailAndPassword(app.email, app.password)
        .then(function () {
          alert("You have logged in")
        })
        .catch(function (error) {
          // Handle Errors here.
          alert(error.message);
        })
    },
    loginWithGoogle: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut: function () {
      firebase.auth().signOut();
    },
    send: function () {
      firebase.database().ref(app.game).push({
        text: app.message
      });
    },
    foro: function (game) {
      app.game = game;
      app.messages = [];
      firebase.database().ref(app.game).on('child_added', function (childSnapshot, prevChildKey) {
        app.messages.push(childSnapshot.val());
      });
    }
  }
})

/*
// All future sign-in request now include tenant ID.
firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(result) {
    // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
  }).catch(function(error) {
    // Handle error.
  });
  //*
  */

firebase.auth().onAuthStateChanged(function (user) {
  app.user = user;
});
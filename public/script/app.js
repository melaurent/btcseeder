var app = new Vue({
   el: '#app',
   data: {
   },
   methods: {
   },
   computed: {
      passPhraseEntered: function() {
         return this.passPhrase != "";
      }
   }
});

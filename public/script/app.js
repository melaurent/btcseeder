var app = new Vue({
   el: '#app',
   data: {
      tokens: [],
      machine: null,
      address: "",
      isAddressError: false,
      isPassPhraseError: false,
      addressError: "",
      passPhraseError: "",
      credit: 10,
      passPhrase: "",
      passPhraseArray: [],
      logged: false,
      privateKey: null
   },
   methods: {
      roll: function(e) {
         if (this.credit == 0) {
            return;
         }
         if (this.address == "") {
            this.isAddressError = true;
            this.addressError = "Please enter your address";
            return;
         }
         this.isAddressError = false;
         socket.emit('rand', this.address);
         this.credit--;
         e.preventDefault();
      },
      register: function(e) {
         var m = new Mnemonic(128);
         this.passPhraseArray = m.toWords();
         this.passPhrase = this.passPhraseArray.toString().replace(/,/gi, " ");
         $('#registerModal').modal('show');
         this.login();
      },
      login: function(e) {
         this.passPhraseArray = this.passPhrase.split(" ");
         m = Mnemonic.fromWords(this.passPhraseArray);
         try {
            this.privateKey = bitcore.HDPrivateKey.fromSeed(m.toHex(), NETWORK);
         } catch (e) {
            this.isPassPhraseError = true;
            this.passPhraseError = "Invalid passphrase";
            return
         }
         var derived = this.privateKey.derive("m/0'/0/" + 0);
         var address = bitcore.Address(derived.publicKey, NETWORK);
         this.address = address.toString();
         this.logged = true;
         this.isAddressError = false;
         localStorage.setItem("mnemonic", this.passPhrase);
      },
      logout: function(e) {
         this.address = "";
         this.logged = false;
         this.isAddressError = false;
         this.isPassPhraseError = false;
         this.addressError = "";
         this.passPhraseError = "";
         this.passPhrase = "";
         this.passPhraseArray = [];
         this.privateKey = null;
         localStorage.clear();
      }
   },
   computed: {
      passPhraseEntered: function() {
         return this.passPhrase != "";
      }
   }
});

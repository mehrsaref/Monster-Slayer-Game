
function randomValue(max,min){
   return Math.floor( Math.random() * (max-min)) + min
}
const app = Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            winner: null,
            messages : []
        }
    },
    watch: {
        playerHealth(value) {
            if(value<=0 && this.monsterHealth<=0){
                this.winner = 'draw'
            } else if(value<=0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value<=0 && this.playerHealth<=0){
                this.winner = 'draw'
            } else if(value<=0){
                this.winner = 'player'
            }
        }
    },
    computed: {
        monsterBarHealth() {
            if(this.monsterHealth < 0){
                return {width:'0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarHealth() {
            if(this.playerHealth < 0){
                return {width:'0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialA() {
            return this.round % 3 !== 0
        }
    },
    methods:{
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.round = 0;
            this.winner = null;
        },
        playerAttack() {
            this.round++
            let attackValue = randomValue(12,5)
            this.monsterHealth -= attackValue
            this.logMessages('player','attack', attackValue)
            this.monsterAttack()

        },
        monsterAttack() {
            let attackValue = randomValue(15,7)
            this.playerHealth -= attackValue
            this.logMessages('monster','attack', attackValue)

        },
        specialAttack(){
            this.round++
            let attackValue = randomValue(25,10)
            this.monsterHealth -= attackValue
            this.logMessages('player','attack', attackValue)
            this.monsterAttack()
        },
        healPlayer() {
            this.round++
            let healValue = randomValue(20,10);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.logMessages('player','heal',healValue)
            this.monsterAttack()
        },
        surrender() {
            this.winner = 'monster'
        },
        logMessages(who,what,value) {
            this.messages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});
app.mount('#game')
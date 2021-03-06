Vue.component('app-icon', {
    template:'<span :class="cssClasses" aria-hidden="true"></span>',
    props: ['img'],
    computed: {
        cssClasses: function () {
            return 'glyphicon glyphicon-' + this.img;
        }
    }
});

Vue.component('app-task', {
    //data: function () {
    data() {
        return {
            editing: false,
            draft: ''
        };
    },
    template: "#task-template",
    props: ['task', 'index'],
    methods: {
        toggleStatus: function() {
            this.task.pending = !this.task.pending;
        },
        edit: function () {
            /*
            FIX ME: reimplement this!
            this.tasks.forEach(function (task) {
                task.editing = false;
            });
            */

            this.draft = this.task.description;
            this.editing = true;
        },
        update: function () {
            this.task.description = this.draft;
            this.editing = false;
        },
        discard: function () {
            this.editing = false;
        },
        remove: function () {
            //this.$parent.tasks.splice(this.index, 1);
            //this.tasks.splice(this.index, 1);
            this.$emit('remove', this.index);
            
        },


    }        
});                            

var vm = new Vue({
    el: "#app",
    methods: {
        createTask: function () {
            this.tasks.push({
                description: this.new_task,
                pending: true,
                editing: false
            });
            this.new_task = '';
        },
        deleteTask: function (index) {
            this.tasks.splice(index, 1);
        },
        deleteCompleted: function () {
            this.tasks = this.tasks.filter(function (task) {
               return task.pending;
            });
        }
    },
    /*created: function () {
        //this.tasks.forEach( function (task) {
        //    this.$set(task, 'editing', false);
        //}.bind(this));
        //this.tasks.forEach( (task) => {
        //    this.$set(task, 'editing', false);
        //});
        this.tasks.forEach( task => {
            this.$set(task, 'editing', false);
        });
    },*/
    data: {
        new_task: '',
        tasks: [
            {
                description: 'Aprender Vue.js',
                pending: true
            },
            {
                description: 'Subcribirse a Style.net',
                pending: true
            },
            {
                description: 'Grabar lección de Vue',
                pending: false
            }
        ]
    }
});


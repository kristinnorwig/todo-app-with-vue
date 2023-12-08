Vue.createApp({
  data() {
    return {
      state: [],
      newTodo: "",
    };
  },
  methods: {
    getTodosFromAPI() {
      fetch("http://localhost:4730/todos")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not OK");
          }
        })

        .then((jsonData) => {
          console.log(jsonData);
          this.state = jsonData;
        });
    },

    addTodoToAPI(newTodo) {
      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not OK");
          }
        })
        .then((jsonData) => {
          getTodosFromAPI();
        });
    },

    updateTodoToAPI(updatedTodo) {
      const todoID = updatedTodo.id;
      fetch("http://localhost:4730/todos/" + todoID, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          renderTodos();
        });
    },

    removeFromAPI() {},

    addTodo(event) {
      if (this.newTodo === "") {
        alert("Bitte Beschreibung eingeben!");
        return;
      }
      const isDoubled = this.state.some(
        (todo) => todo.description.toLowerCase() === this.newTodo.toLowerCase()
      );

      if (isDoubled) {
        alert("Aufgabe existiert bereits!");
        return;
      }

      const newTodo = {
        description: this.newTodo,
        done: false,
      };

      this.state.push(newTodo);

      this.newTodo = "";

      this.addTodoToAPI(newTodo);
    },

    removeDoneTodos() {},
    filterTodos() {},
  },
  computed: {},
  created() {
    this.getTodosFromAPI();
  },
}).mount("#app");

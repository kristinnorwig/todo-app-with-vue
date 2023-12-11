Vue.createApp({
  data() {
    return {
      state: [],
      newTodo: "",
      filter: "all",
      filteredTodos: [],
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
          this.filterTodos();
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
          this.getTodosFromAPI();
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

    filterTodos() {
      if (this.filter === "all") {
        this.filteredTodos = this.state;
      } else if (this.filter === "open") {
        console.log("Filtering open todos");
        this.filteredTodos = this.state.filter((todo) => !todo.done);
      } else if (this.filter === "done") {
        console.log("Filtering done todos");
        this.filteredTodos = this.state.filter((todo) => todo.done);
      }

      console.log(this.filteredTodos);
      console.log(this.filter);
    },
  },
  computed: {},

  created() {
    this.getTodosFromAPI();
  },
}).mount("#app");

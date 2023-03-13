// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        if (!name && !id && !email) {
            this.name = undefined;
            this.id = undefined;
            this.email = undefined;
        } else if (name && !id && !email) {
            if (typeof(name) === "string") {
                this.name = name;
                this.id = undefined;
                this.email = undefined;
            };
        } else if (!name && id && !email) {
            if (!isNaN(id)) {
                this.name = undefined;
                this.id = id; 
                this.email = undefined;
            };
        } else if (!name && !id && email) { 
            if (typeof(email) === "string") {
                this.name = undefined;
                this.id = undefined;
                this.email = email;
            };
        };

        this.name = name;
        this.id = id;
        this.email = email;
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getEmail() {
      return this.email;
    }
  
    getRole() {
      return 'Employee';
    }
};

module.exports = Employee;
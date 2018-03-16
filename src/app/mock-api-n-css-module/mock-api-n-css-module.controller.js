/**
 * Created by qxqs1 on 2017/6/19.
 */

import angular from 'angular';

class MackAppCtrl {
    /** @ngInject */
    constructor($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        this.initUsers();
        this.initBooks();
    }

    initUsers() {
        this.$http.get('/rest/users').then((response) => {
            this.users = response.data;
        });

        this.$http.get('/rest/users/admin').then((response) => {
            this.admins = response.data;
        });
    }

    initBooks() {
        this.$http.get('/rest/books').then((response) => {
            this.books = response.data;
        });
    }

    addBook(name, price) {
        this.$http.post('/rest/book', { name, price }).then((response) => {
            const book = response.data;

            if (angular.isDefined(book.id)) {
                this.books.push(book);
            }
        });
    }

    delBook(id) {
        this.$http.delete(`/rest/book/${id}`).then((response) => {
            if (response.data.id === id) {
                const index = this.books.findIndex(book => (book.id === id));

                if (index >= 0) {
                    this.books.splice(index, 1);
                }
            }
        });
    }
}

export default MackAppCtrl;

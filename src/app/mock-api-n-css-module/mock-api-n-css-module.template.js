import css from './mock-api-n-css-module.pcss';

export default `<div>Hello CSS Module</div>

<h2>Users</h2>

<table class="${css.UserTable}">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="user in $ctrl.users">
            <td ng-bind="user.id"></td>
            <td ng-bind="user.name" ng-class="{ '${css.important}': user.id === 0 }" ></td>
            <td ng-bind="user.email"></td>
        </tr>
    </tbody>
</table>

<h2>Admins</h2>

<table class="${css.UserTable}">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="user in $ctrl.admins">
            <td ng-bind="user.id"></td>
            <td ng-bind="user.name"></td>
            <td ng-bind="user.email"></td>
        </tr>
    </tbody>
</table>

<h2>Books</h2>

<div>
    <input placeholder="Book's name" ng-model="$ctrl.newBookName">
    <input placeholder="Book's price" ng-model="$ctrl.newBookPrice">
    <button ng-click="$ctrl.addBook($ctrl.newBookName, $ctrl.newBookPrice)">New a book</button>
</div>

<table class="${css.BooksTable}">
    <thead>
        <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Price</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr class="book-row" ng-repeat="book in $ctrl.books">
            <td ng-bind="book.id"></td>
            <td ng-bind="book.name"></td>
            <td ng-bind="book.price"></td>
            <td><button class="del-book" ng-click="$ctrl.delBook(book.id)">Delete</button></td>
        </tr>
    </tbody>
</table>
`;

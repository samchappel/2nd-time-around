
from flask import  request, make_response, session, abort, jsonify
from werkzeug.exceptions import NotFound, Unauthorized
from flask_restful import  Resource
from models import User, Product, OrderStatus, Order, Review, Favorite
from config import db, api, app

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(
            users,
            200
        )

        return response

    api.add_resource(Users, '/users')

class Products(Resource):
    def get(self):
        product_list = [product.to_dict() for product in Product.query.all()]
        response = make_response(
            product_list,
            200
        )

        return response

    def post(self):
        form_json = request.get_json()
        new_product = Product(
            name=form_json['name'],
            price=form_json['price'],
            description=form_json['description'],
            image=form_json['image']
        )

        db.session.add(new_product)
        db.session.commit()

        response_dict = new_product.to_dict()

        response = make_response(
            response_dict,
            201
        )
        
        return response

api.add_resource(Products, '/products')

class ProductByID(Resource):
    def get(self, id):
        product = Product.query.filter_by(id=id).first()
        if not product:
            raise NotFound
        product_dict = product.to_dict()
        response = make_response(
            product_dict,
            200
        )

        return response

    def patch(self, id):
        product = Product.query.filter_by(id=id).first()
        if not product:
            raise NotFound

        for attr in request.form:
            setattr(product, attr, request.form[attr])

        product.price = int(request.form['price'])

        db.session.add(product)
        db.session.commit()

        product_dict = product.to_dict()

        response = make_response(
            product_dict,
            200
        )

        return response

    def delete(self, id):
        product = Product.query.filter_by(id=id).first()
        if not product:
            raise NotFound
        
        db.session.delete(product)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(ProductByID, '/products/<int:id>')

class Reviews(Resource):
    def get(self):
        review_list = [review.to_dict() for review in Review.query.all()]
        response = make_response(
            review_list,
            200
        )

        return response

    def post(self):
        form_json = request.get_json()
        new_review = Review(
            rating=form_json['rating'],
            comment=form_json['comment'],
            user_id = session['user_id'],
            product_id = int(form_json['product_id'])
        )

        db.session.add(new_review)
        db.session.commit()

        response_dict = new_review.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound
        review_dict = review.to_dict()
        response = make_response(
            review_dict,
            200
        )

        return response

    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound

        for attr in request.form:
            setattr(review, attr, request.form[attr])

        review.rating = int(request.form['rating'])

        db.session.add(review)
        db.session.commit()

        review_dict = review.to_dict()

        response = make_response(
            review_dict,
            200
        )

        return response

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound

        db.session.delete(review)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(ReviewByID, '/reviews/<int:id>')

class Favorites(Resource):
    def get(self):
        favorite_list = [favorite.to_dict() for favorite in Favorite.query.all()]
        response = make_response(
            favorite_list,
            200
        )

        return response

    def post(self):
        data = request.get_json()
        new_favorite = Favorite(
            user_id=data['user_id'],
            product_id=data['product_id']
        )

        db.session.add(new_favorite)
        db.session.commit()

        response_dict = new_favorite.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response

api.add_resource(Favorites, '/favorites')

class FavoriteByID(Resource):
    def delete(self, id):
        favorite = Favorite.query.filter_by(id=id).first()
        if not favorite:
            raise NotFound

        db.session.delete(favorite)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(FavoriteByID, '/favorites/<int:id>')

class Signup(Resource):
     def post(self):
        
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        password = request.get_json()['password']

        new_user = User(first_name=first_name, last_name=last_name, email=email, admin=False)
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id
                
        return new_user.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):

    def post(self):
        user = User.query.filter(User.email == request.get_json()['email']).first()
        session['user_id'] = user.id
        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            200,
        )
        return response

api.add_resource(Login, '/login', endpoint='login')

class AuthorizedSession(Resource):
    def get(self):

        if session.get('user_id'):
            
            user = User.query.filter(User.id == session['user_id']).first()
            
            return user.to_dict(), 200
            
        else:
            raise Unauthorized


api.add_resource(AuthorizedSession, '/authorized', endpoint='authorized')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('',204,)
        return response

api.add_resource(Logout, '/logout', endpoint='logout')


    @app.errorhandler(NotFound)
    def handle_not_found(e):
        response = make_response(
            "Not Found: Sorry the resource you are looking for does not exist",
            404
        )

        return response


if __name__ == '__main__':
    app.run(port=5000, debug=True)
export function formatPrice(price){
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const foodItems =[
    {
    name: 'Pizza',
    img: '/img/pizza.jpeg',
    category: 'Pizza',
    price: 15
    },
    {
        name: 'Cheese Pizza',
        img: '/img/cheesepizza.jpeg',
        category: 'Pizza',
        price: 18
        },
    {
        name: 'Pepperoni Pizza',
        img: '/img/pepperonipizza.jpeg',
        category: 'Pizza',
        price: 20,
     },
     {
        name: 'Sausage Pizza',
        img: '/img/sausagepizza.jpeg',
        category: 'Pizza',
        price: 20
    },
    {
        name: 'Shrimp Pizza',
        img: '/img/shrimppizza.jpeg',
        category: 'Pizza',
        price: 25
    },
    {
    name: 'Cheese Burger',
    img: '/img/cheeseburger.jpeg',
    category: 'Burgers',
    price: 12
    },
    {
    name: 'Cheese Burger',
    img: '/img/cheeseburger2.jpeg',
    category: 'Burgers',
    price: 12.99
    },
    {
    name: 'Bacon Cheese Burger',
    img: '/img/baconburger.jpeg',
    category: 'Burgers',
    price: 14.5
    },
    {
        name: 'Egg Rolls',
        img: '/img/eggrolls.jpeg',
        category: 'Appetizer',
        price: 8
    },    
    {
    name: 'Chicken Fingers',
    img: '/img/fingerfoods.jpeg',
    category: 'Appetizer',
    price: 7.75
    },
    {
    name: 'Mozzarella Sticks',
    img: '/img/mozzarellasticks.jpeg',
    category: 'Appetizer',
    price: 5
    },
    {
        name: 'Wings',
        img: '/img/wings.jpeg',
        category: 'Appetizer',
        price: 9
        },
    {
    name: 'Sandwich',
    img: '/img/sandwich.jpeg',
    category: 'Sandwich',
    price: 12
    },  
    {
        name: 'Cheese Steak',
        img: '/img/cheesesteak.jpeg',
        category: 'Sandwich',
        price: 15
  },    
  {
    name: 'Buffalo Chicken Sandwich',
    img: '/img/buffalochickensandwich.jpeg',
    category: 'Sandwich',
    price: 12
    },  
    {
        name: 'Italian Hoagie',
        img: '/img/italianhoagie.jpeg',
        category: 'Sandwich',
        price: 10
        },  
    {
    name: 'Drinks',
    img: '/img/drinks.jpeg',
    category: 'Drinks',
    price: 7
    },
    {
    name: 'Red Wine',
    img: '/img/redwine.jpeg',
    category: 'Drinks',
    price: 10
    },
    {
    name: 'Martini',
    img: '/img/martini.jpeg',
    category: 'Drinks',
    price: 12
    },
    {
        name: 'Cape May IPA',
        img: '/img/capemayipa.jpeg',
        category: 'Drinks',
        price: 8
    },
    {
        name: 'Soda',
        price: 1,
        category: 'Soda',
        choices: ['Coke', 'Pepsi', 'Sprite', 'Root Beer']
    }
];

export const foods = foodItems.reduce((res, food) => {
    if(!res[food.category]){
        res[food.category]=[];
    }
    res[food.category].push(food);
    return res;
}, {});
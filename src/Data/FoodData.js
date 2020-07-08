export const foodItems =[
    {
    name: 'Pizza',
    img: '/img/pizza.jpeg',
    category: 'Pizza'
    },
    {
        name: 'Cheese Pizza',
        img: '/img/cheesepizza.jpeg',
        category: 'Pizza'
        },
    {
        name: 'Pepperoni Pizza',
        img: '/img/pepperonipizza.jpeg',
        category: 'Pizza'
     },
     {
        name: 'Sausage Pizza',
        img: '/img/sausagepizza.jpeg',
        category: 'Pizza'
    },
    {
        name: 'Shrimp Pizza',
        img: '/img/shrimppizza.jpeg',
        category: 'Pizza'
    },
    {
    name: 'Cheese Burger',
    img: '/img/cheeseburger.jpeg',
    category: 'Burgers'
    },
    {
    name: 'Cheese Burger',
    img: '/img/cheeseburger2.jpeg',
    category: 'Burgers'
    },
    {
    name: 'Bacon Cheese Burger',
    img: '/img/baconburger.jpeg',
    category: 'Burgers'
    },
    {
        name: 'Egg Rolls',
        img: '/img/eggrolls.jpeg',
        category: 'Appetizer'
    },    
    {
    name: 'Chicken Fingers',
    img: '/img/fingerfoods.jpeg',
    category: 'Appetizer'
    },
    {
    name: 'Mozzarella Sticks',
    img: '/img/mozzarellasticks.jpeg',
    category: 'Appetizer'
    },
    {
        name: 'Wings',
        img: '/img/wings.jpeg',
        category: 'Appetizer'
        },
    {
    name: 'Sandwich',
    img: '/img/sandwich.jpeg',
    category: 'Sandwich'
    },  
    {
        name: 'Cheese Steak',
        img: '/img/cheesesteak.jpeg',
        category: 'Sandwich'
  },    
  {
    name: 'Buffalo Chicken Sandwich',
    img: '/img/buffalochickensandwich.jpeg',
    category: 'Sandwich'
    },  
    {
        name: 'Italian Hoagie',
        img: '/img/italianhoagie.jpeg',
        category: 'Sandwich'
        },  
    {
    name: 'Drinks',
    img: '/img/drinks.jpeg',
    category: 'Drinks'
    },
    {
    name: 'Red Wine',
    img: '/img/redwine.jpeg',
    category: 'Drinks'
    },
    {
    name: 'Martini',
    img: '/img/martini.jpeg',
    category: 'Drinks'
    },
    {
        name: 'Cape May IPA',
        img: '/img/capemayipa.jpeg',
        category: 'Drinks'
    },
];

export const foods = foodItems.reduce((res, food) => {
    if(!res[food.category]){
        res[food.category]=[];
    }
    res[food.category].push(food);
    return res;
}, {});
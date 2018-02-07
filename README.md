# collant  
> ( prounouce *kɔlɑ̃* )  À la française  


_(Another)_ Small package to stick your elements

## Installation
```bash
npm install --save collant
```
For the moment **collant** depend of jQuery but will soon be free from it.

## Usage
### Markup
Here the `.sidebar` is the element you want to be sticky.
You need put the class `wrapper-collant` on the container you want your element to be sticked to.

```html
<div class='container wrapper-collant'>
  <div class='sidebar'>
    Je suis collant
  </div>
</div>
```

If you ask for `wrapper: false` (see ***Arguments*** 👇), the class `wrapper-collant` is needed on the body.

### CSS
In order to work **collant** need some lines of CSS. Just paste them in your styles file.

```css
.wrapper-collant{
    position: relative;
}
.collant{
    position: fixed !important;
}
.collant-stuck{
    position: absolute;
}
```

### JS  
Import the package. Then call the function with your arguments.

```javascript
import collant from 'collant';

collant(element, offsetTop, options);
```

### Arguments

+ **element** _jQuery element_  
  The element you want to be sticky, can be an array of elements.
    
+ **offsetTop** _Number_  
  The offset between the top of your element and the top of the viewport. Value in pixel ( for viewport based value see ***options*** 👇 )
  
+ **options** _Object_  
  Object of optionnal arguments
  
  + **unit** _String_  
  Choose the unit for the offsetTop.  
      values: `'px'` or `'vh'`  
      default: `'px'`
    
   + **updateHeightOnScroll** _Boolean_  
   If you need to update the height of your sticky element on scroll. For example if you changed its height dynamically.  
      default: `false`
    
   + **wrapper** _Boolean_  
   Whether you need or not  a `wrapper-collant`. If not you rsticky element will be sticked to the viewport.  
      default: `true`  
    
   + **minimumWidth** _Number_  
    Viewport width where the sticky effect is applied. If the viewport is below this width your element won't be stiky anymore 👋  
       default: `false`
       
   + **bottom** _Boolean_  
   If you want your sidebar to stick to the bottom instead of the top 
       default: `false`
       
   + *More to come*
   
### Example
```javascript
  collant($('.sidebar'), 15, {
    unit = 'vh',
    minimuWidth: 780,
  });
```

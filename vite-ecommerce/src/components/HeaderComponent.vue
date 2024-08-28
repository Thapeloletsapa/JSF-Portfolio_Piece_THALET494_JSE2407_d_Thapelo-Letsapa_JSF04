<template>
  <header class="header">
    <RouterLink :to="{ name: 'home' }">
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30" fill="#fff"><path d="M24,8.5c0-.132-.018-.264-.052-.392l-1.146-4.226c-.715-2.322-2.827-3.882-5.257-3.882H6.454C4.024,0,1.912,1.561,1.184,3.932L.052,8.108c-.201,1.159,.272,2.363,.948,3.215v8.177c0,2.481,2.019,4.5,4.5,4.5h5c2.481,0,4.5-2.019,4.5-4.5v-7.26c.176-.118,.343-.248,.5-.389,.797,.714,1.848,1.149,3,1.149h1c.169,0,.336-.01,.5-.028v9.528c.034,1.972,2.967,1.971,3,0V11.323c.624-.773,1-1.755,1-2.823Zm-12,11c0,.827-.673,1.5-1.5,1.5H5.5c-.827,0-1.5-.673-1.5-1.5v-.5H12v.5Zm0-3.5H4v-3.028c.164,.018,.331,.028,.5,.028h1c1.152,0,2.203-.435,3-1.149,.797,.714,1.848,1.149,3,1.149h.5v3Zm7.5-6h-1c-.827,0-1.5-.673-1.5-1.5s-.672-1.5-1.5-1.5-1.5,.671-1.5,1.5-.673,1.5-1.5,1.5h-1c-.827,0-1.5-.673-1.5-1.5s-.671-1.5-1.5-1.5-1.5,.671-1.5,1.5-.673,1.5-1.5,1.5h-1c-.771,0-1.408-.585-1.491-1.334l1.056-3.901c.325-1.056,1.285-1.765,2.389-1.765h.546v.5c.033,1.972,2.967,1.971,3,0v-.5h4v.5c.034,1.972,2.967,1.971,3,0v-.5h.546c1.104,0,2.064,.709,2.375,1.716l1.07,3.95c-.083,.749-.72,1.334-1.491,1.334Z"/></svg>
  </RouterLink>
    <h1 class="logo">Convinient Store</h1>
    <nav>
      <RouterLink :to="{ name: 'home' }">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24" fill="#fff" >
  <path d="M12,14.685c-1.149,0-2.085,.985-2.085,2.196v6.076c.653,.027,1.348,.043,2.085,.043s1.432-.016,2.085-.043v-6.076c0-1.211-.936-2.196-2.085-2.196Z"/>
  <path d="M21.085,6.758c-.07-.149-.176-.279-.308-.377-.185-.138-.374-.278-.564-.418V3.505c0-.829-.672-1.5-1.5-1.5s-1.5,.671-1.5,1.5v.315c-2.274-1.56-4.371-2.82-5.213-2.82-1.299,0-5.49,2.927-8.778,5.382-.133,.1-.24,.231-.31,.383-.047,.102-1.154,2.562-1.154,7.578,0,2.165,.202,5.37,.432,6.858,.059,.38,.33,.692,.698,.804,.098,.03,1.842,.548,5.027,.825v-5.948c0-2.314,1.832-4.196,4.085-4.196s4.085,1.882,4.085,4.196v5.948c3.185-.276,4.928-.795,5.025-.824,.367-.112,.639-.424,.697-.804,.231-1.498,.435-4.703,.435-6.858,0-5.059-1.11-7.483-1.157-7.584Z"/>
</svg>

</RouterLink>
<RouterLink :to="{ name: 'wishlist' }" v-if="!isLoggedIn">
  <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M478.609,99.726H441.34c4.916-7.78,8.16-16.513,9.085-25.749C453.38,44.46,437.835,18,411.37,6.269
			c-24.326-10.783-51.663-6.375-71.348,11.479l-47.06,42.65c-9.165-10.024-22.34-16.324-36.962-16.324
			c-14.648,0-27.844,6.32-37.011,16.375l-47.12-42.706C152.152-0.111,124.826-4.502,100.511,6.275
			C74.053,18.007,58.505,44.476,61.469,73.992c0.927,9.229,4.169,17.958,9.084,25.734H33.391C14.949,99.726,0,114.676,0,133.117
			v50.087c0,9.22,7.475,16.696,16.696,16.696h478.609c9.22,0,16.696-7.475,16.696-16.696v-50.087
			C512,114.676,497.051,99.726,478.609,99.726z M205.913,94.161v5.565H127.37c-20.752,0-37.084-19.346-31.901-40.952
			c2.283-9.515,9.151-17.626,18.034-21.732c12.198-5.638,25.71-3.828,35.955,5.445l56.469,51.182
			C205.924,93.834,205.913,93.996,205.913,94.161z M417.294,69.544c-1.244,17.353-16.919,30.184-34.316,30.184h-76.891v-5.565
			c0-0.197-0.012-0.392-0.014-0.589c12.792-11.596,40.543-36.748,55.594-50.391c8.554-7.753,20.523-11.372,31.587-8.072
			C409.131,39.847,418.455,53.349,417.294,69.544z"/>
	</g>
</g>
<g>
	<g>
		<path d="M33.391,233.291v244.87c0,18.442,14.949,33.391,33.391,33.391h155.826V233.291H33.391z"/>
	</g>
</g>
<g>
	<g>
		<path d="M289.391,233.291v278.261h155.826c18.442,0,33.391-14.949,33.391-33.391v-244.87H289.391z"/>
	</g>
</g>
</svg>
      </RouterLink>

      <RouterLink :to="{ name: 'login' }" v-if="!isLoggedIn">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
          <path d="m24,10.5v3h-13.329l2.389,2.389-2.121,2.121-4.243-4.243c-.975-.975-.975-2.561,0-3.535l4.243-4.243,2.121,2.121-2.389,2.389h13.329Zm-12,10.5c-4.962,0-9-4.038-9-9S7.038,3,12,3c3.525,0,6.574,2.042,8.05,5h3.25C21.647,3.347,17.213,0,12,0,5.383,0,0,5.383,0,12s5.383,12,12,12c5.213,0,9.647-3.347,11.3-8h-3.25c-1.476,2.958-4.526,5-8.05,5Z"/>
        </svg>
      </RouterLink>
      <RouterLink :to="{ name: 'register' }" v-if="!isLoggedIn">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24" fill="#fff" ><path d="M16,2h-.171c-.413-1.164-1.525-2-2.829-2h-2c-1.304,0-2.416,.836-2.829,2h-.171c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM7,18c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm10,0h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1ZM7,14c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm10,0h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1ZM7,10c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm10,0h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1Z"/></svg>

      </RouterLink>
      <RouterLink :to="{ name: 'cart' }">
        <div class="cart-link">
          <span class="cart-count">{{ cartItemCount }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" height="24" width="24" fill="#fff">
  <path d="m1,2.5C1,1.119,2.119,0,3.5,0s2.5,1.119,2.5,2.5-1.119,2.5-2.5,2.5S1,3.881,1,2.5Zm.5,16c-.829,0-1.5.672-1.5,1.5v2.5c0,.828.671,1.5,1.5,1.5s1.5-.672,1.5-1.5v-2.5c0-.828-.671-1.5-1.5-1.5Zm22.461-.457c-.187-.808-.992-1.311-1.8-1.122l-6.813,1.579-2.86-12.339c-.187-.808-.993-1.311-1.8-1.122-.807.187-1.31.993-1.123,1.8l.733,3.161h-1.966l-1.325-2.121c-.736-1.177-2.004-1.879-3.392-1.879h-.614c-1.654,0-3,1.346-3,3v4.085c0,1.396.744,2.71,1.942,3.43l3.058,1.835v4.15c0,.828.671,1.5,1.5,1.5s1.5-.672,1.5-1.5v-4.434c0-.873-.465-1.695-1.213-2.144l-1.787-1.072v-4.52l.935,1.497c.461.734,1.253,1.173,2.119,1.173h2.939l1.446,6.236c-.85.399-1.439,1.262-1.439,2.264,0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5c0-.024-.001-.048-.002-.072l6.841-1.586c.807-.187,1.31-.992,1.123-1.8Zm-7.531-3.408c.201.859,1.062,1.391,1.92,1.187l2.907-.691c.854-.203,1.383-1.059,1.183-1.914l-.7-2.986c-.201-.859-1.062-1.391-1.92-1.187l-2.907.691c-.854.203-1.383,1.059-1.183,1.914l.7,2.986Z"/>
</svg>

        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'comparison' }" v-if="hasItemsToCompare"> Compare </RouterLink>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router'
import CompareButton from './CompareButton.vue';
import WishList2 from './WishList2.vue';

export default {
  name: 'HeaderComponent',
  components: { RouterLink },
  setup() {
    const store = useStore();
    const cartItemCount = computed(() => store.getters.cartItemCount);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const hasItemsToCompare = ref(false);

    store.subscribe((mutation) => {
      hasItemsToCompare.value = store.getters.hasItemsToCompare;
    });
    
    return {
      cartItemCount,
      isLoggedIn,
      hasItemsToCompare,
    };
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #0a1128;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.header nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.header nav a:hover {
  text-decoration: underline;
}
.header nav img[src*="home (2).svg"] {
  fill: white; /* Change the fill color to white */
}

.header nav img[src*="home (2).svg"]:hover {
  fill: #cccccc; /* Change fill color to light grey on hover */
}

.header nav svg {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header nav a {
  margin: 0 20px;
}

.header nav svg:hover {
  filter: drop-shadow(0 0 5px rgba(128, 128, 128, 0.5)); /* add a grey shadow on hover */
}

.cart-link {
  display: flex;
  align-items: center;
}

.cart-count {
  font-size: 12px;
  font-weight: bold;
  margin-right: 5px;
}

.cart-link svg {
  width: 24px;
  height: 24px;
}
</style>
<template>
  <div class="block">
    <div class="card mt-4 p-4">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media-content">
          <div class="block">
            <span>Название</span>
            <p class="title is-3">{{ product.title }}</p>
          </div>
          <div class="block">
            <span>Цена</span>
            <p class="title is-3">{{ product.price }} руб.</p>
          </div>
          <div class="block">
            <span>Кол-во</span>
            <p class="title is-3">{{ product.amount }} шт.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <v-textarea v-model="commentText" label="Текст комментария" />
      <v-btn
        @click="
          fetchCreateComment({ ProductId: product.id, text: commentText })
        "
        >Оставить комментарий</v-btn
      >
    </div>
    <div class="block">
      <ul>
        <li class="mt-4" v-for="(el, idx) in comments" :key="idx">
          <div
            class="
              box
              d-flex
              is-justify-content-space-between is-align-content-center
            "
          >
            <span class="title">{{ el.text }}</span>
            <v-btn @click="like(el)">
              <v-icon v-if="!el.isliked">mdi-thumb-up-outline</v-icon>
              <v-icon v-else>mdi-thumb-down-outline</v-icon>
            </v-btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      commentText: "",
      isLiked: false,
    };
  },
  computed: {
    ...mapGetters({
      product: "product",
      comments: "comments",
    }),
  },
  created() {
    this.fetchProduct(this.$route.params.id);
    this.fetchComments(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      fetchProduct: "fetchProduct",
      fetchCreateComment: "fetchCreateComment",
      fetchComments: "fetchComments",
      fetchUpdateComment: "fetchUpdateComment",
    }),
    like(el) {
      if (!el.isliked) {
        el.likes += 1;
      } else {
        el.likes -= 1;
      }
      el.isliked = !el.isliked;
      this.fetchUpdateComment(el);
    },
  },
};
</script>

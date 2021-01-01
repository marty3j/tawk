<template>
  <div id="header-wrapper" class="container">
    <div class="row">
      <div class="col-sm-12">
        <div id="header-text">
          <h1>Knowledge base doesn't have to be boring</h1>
          <h3>Everything you need to manage your messaging</h3>
        </div>
        <div class="searchdiv">
          <input
            type="text"
            v-model="search"
            placeholder="Search for answers"
          />
          <span
            @click="
              text = search;
              showArticles = false;
              showCategories = true;
            "
          >
            <i id="filtersubmit" class="fa fa-search"></i
          ></span>
        </div>

        <div
          class="row bcbg"
          v-if="showArticles"
          @click="
            text = '';search='';
            showArticles = false;
            showCategories = true;
          "
        >
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">All categories</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ categoryDetails[1] }}
              </li>
            </ol>
          </nav>
        </div>

        <categorylist
          :btn-text="text"
          @updatecatId="optionUpdate"
          v-if="showCategories"
        ></categorylist>
        <articleslist
          :cat-id="myCatId"
          :cat-details="categoryDetails"
          v-if="showArticles"
        ></articleslist>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      text: "",
      myCatId: "",
      categoryDetails: [],
      showCategories: true,
      showArticles: false,
      showAuthor: false,
    };
  },
  methods: {
    optionUpdate: function (catDetails) {
      this.myCatId = catDetails[0];
      this.showCategories = false;
      this.showArticles = true;
      this.categoryDetails = catDetails;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/_variables.scss";

#header-text {
  text-align: center;
  font-family: $font-family;
  color: $text-black;
  padding: 20px;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
  }

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
  }
}

.searchdiv {
  text-align: center;
  padding-bottom: 20px;
}
.searchdiv input {
  height: 40px;
  width: 50%;
}
.searchdiv span {
  padding: 9px;
  background-color: green;
  padding-left: 14px;
  padding-right: 14px;
  position: absolute;
}
.fas {
  color: green;
}
.bcbg {
  background-color: #f8f9fa;
  font-size: 12px;
  padding-top: 10px;
}
.bcbg a {
  color: green;
  text-decoration: none;
}
</style>
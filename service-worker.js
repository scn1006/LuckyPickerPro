/*==================================================
    Lucky Picker Pro Premium
    Service Worker
    Version 1.0
==================================================*/


"use strict";


const CACHE_NAME =

    "lucky-picker-pro-v1";



const APP_FILES = [


    "./",


    "./index.html",


    "./styles.css",


    "./app.js",


    "./manifest.json"



];





/*==================================================
    INSTALL
==================================================*/


self.addEventListener(

    "install",

    event=>{


        event.waitUntil(


            caches.open(

                CACHE_NAME

            )

            .then(

                cache=>{


                    return cache.addAll(

                        APP_FILES

                    );


                }

            )


        );


        self.skipWaiting();


    }

);





/*==================================================
    ACTIVATE
==================================================*/


self.addEventListener(

    "activate",

    event=>{


        event.waitUntil(


            caches.keys()

            .then(

                keys=>{


                    return Promise.all(

                        keys.map(

                            key=>{


                                if(

                                    key !== CACHE_NAME

                                ){


                                    return caches.delete(

                                        key

                                    );


                                }


                            }

                        )

                    );


                }

            )


        );


        self.clients.claim();


    }

);





/*==================================================
    FETCH
==================================================*/


self.addEventListener(

    "fetch",

    event=>{


        event.respondWith(


            caches.match(

                event.request

            )

            .then(

                response=>{


                    return response

                    ||

                    fetch(

                        event.request

                    )

                    .then(

                        networkResponse=>{


                            return caches.open(

                                CACHE_NAME

                            )

                            .then(

                                cache=>{


                                    cache.put(

                                        event.request,

                                        networkResponse.clone()

                                    );


                                    return networkResponse;


                                }

                            );


                        }

                    );


                }

            )


        );


    }

);

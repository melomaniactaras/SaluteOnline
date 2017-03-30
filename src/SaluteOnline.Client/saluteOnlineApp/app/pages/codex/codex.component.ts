﻿import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'so-codex',
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./codex.component.scss').toString()],
    template: require('./codex.component.html')
})

export class SoCodex {

    tooltips = {
        244: "Голосування відбувається шляхом виставлення на стіл руки, стисненої в кулак з піднятим догори великим пальцем.",
        281: "При настанні такої ігрової ситуації, коли всі гравці, що мали роль «мафії», були виведені з гри шляхом голосування або ж вбивств вночі, але хоча б один з мирних " +
            "гравців покинув гру внаслідок голосування вдень, ведучий оголошує Перемогу мирних.",
        282: "При настанні такої ігрової ситуації, коли кількість гравців з обох команд урівнялась та повністю завершився поточний етап гри, але на цей момент склад команди " +
            "чорних налічує одного або двох гравців, ведучий оголошує Перемогу мафії.",
        283: "При настанні такої ігрової ситуації, коли всі гравці, що мали роль «мафії», були виведені з гри шляхом голосування або вбивств вночі, і при цьому жоден гравець з " +
            "команди «мирних» не покинув гру шляхом голосування вдень, або ж кимось з гравців команди «мафії» були порушені пункти 3.11- 3.14 даного Кодексу, ведучий оголошує Технічну " +
            "Перемогу мирних.",
        284: "При настанні такої ігрової ситуації, коли кількість гравців з обох команд урівнялась та повністю завершився поточний етап гри, і на цей момент склад команди чорних налічує " +
            "трьох гравців, або ж кимось з гравців команди «мирних» були порушені пункти 3.11- 3.14 даного Кодексу, ведучий оголошує Технічну Перемогу мафії.",
        36: "Гравцеві, який проголосував, заборонено забирати руку від столу до моменту, коли ведучий назве кількість прийнятих голосів. Також заборонено порушувати порядок голосування " +
            "(голосувати за декілька кандидатур, відмова голосувати в випадку, коли Ведучий вимагає поставити на стіл руки тих, хто утримався від голосування)."
    }

    constructor() { 
    }
}
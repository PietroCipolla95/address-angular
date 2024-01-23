import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-anagraphics-view',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './anagraphics-view.component.html',
  styleUrl: './anagraphics-view.component.scss'
})
export class AnagraphicsViewComponent implements OnInit {
  httpClient = inject(HttpClient);
  anagraphics: any = [];

  ngOnInit(): void {
    this.fetchAnagraphics()
  }

  fetchAnagraphics() {
    this.httpClient.get('http://127.0.0.1:8000/api/anagraphics')
      .subscribe((data: any) => {
        this.anagraphics = data.result
        console.log(this.anagraphics);
      })
  }

}

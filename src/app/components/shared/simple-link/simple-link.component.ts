import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-simple-link',
  templateUrl: './simple-link.component.html',
  styleUrls: ['./simple-link.component.sass']
})
export class SimpleLinkComponent implements OnInit {
  // Rendering a component without any outer tag
  // https://stackoverflow.com/a/56887630/5511776
  @ViewChild('template', { static: true }) template: any;
  @Input() href = '';

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}

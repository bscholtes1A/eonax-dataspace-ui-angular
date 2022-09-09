import { Component, Input } from '@angular/core';
import { ContractOffer } from 'src/app/models/contract-offer';

@Component({
  selector: 'app-contract-panel',
  templateUrl: './contract-panel.component.html',
  styleUrls: ['./contract-panel.component.scss'],
})
export class ContractPanelComponent {
  @Input()
  co!: ContractOffer;

  constructor() {}
}

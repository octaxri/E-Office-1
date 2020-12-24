<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DocumentSigned extends Mailable
{
    use Queueable, SerializesModels;

    public $UserMessage;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($UserMessage)
    {
        $this->UserMessage = $UserMessage;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->view('vendor.document-signed')->with(['array' => $this->UserMessage]);
    }
}

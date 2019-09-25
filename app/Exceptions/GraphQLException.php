<?php

namespace App\Exceptions;

use Exception;
use GraphQL\Error\ClientAware;

class GraphQLException extends Exception implements ClientAware
{
    /**
     * @var string
     */
    private $reason;

    /**
     * @var bool
     */
    private $_isClientSafe;

    /**
     * @var string
     */
    private $_category;

    /**
     * @var string
     */
    protected $message;

    /**
     * Public constructor
     *
     * @param string $message
     * @param string $reason
     */
    public function __construct(string $message, string $reason, bool $isClientSafe, string $category)
    {
        parent::__construct($message);

        $this->reason = $reason;
        $this->_isClientSafe = $isClientSafe;
        $this->_category = $category;
    }

    /**
     * Returns true when exception message is safe to be displayed to a client.
     *
     * @return boolean
     */
    public function isClientSafe(): bool
    {
        return $this->_isClientSafe;
    }

    /**
     * Returns string describing a category of the error.
     *
     * Value "graphql" is reserved for errors produced by query parsing or validation, do not use it.
     *
     * @return string
     */
    public function getCategory(): string
    {
        return $this->_category;
    }

    public function getReason(): string
    {
        return $this->reason;
    }

    /**
     * Return the content that is put in the "extensions" part
     * of the returned error.
     *
     * @return array
     */
    public function extensionsContent(): array
    {
        return [
            'category' => $this->getCategory(),
            'isClientSafe' => $this->isClientSafe(),
            'reason' => $this->getReason(),
            'message' => $this->getMessage()
        ];
    }

}
